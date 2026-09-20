const {
  DynamoDBClient,
} = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  QueryCommand,
  GetCommand,
  UpdateCommand,
} = require("@aws-sdk/lib-dynamodb");

const config = require("../config/env");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-south-1",
});

const db = DynamoDBDocumentClient.from(client);

const TABLE_NAME =
  process.env.DYNAMODB_TABLE_NAME || "CanteenTable";

const GSI_NAME = "GSI1";

const VALID_STATUSES = [
  "ORDERED",
  "PREPARING",
  "READY",
  "COLLECTED",
];

const STATUS_TRANSITIONS = {
  ORDERED: "PREPARING",
  PREPARING: "READY",
  READY: "COLLECTED",
};

async function getActiveOrders() {
  const result = await db.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      IndexName: GSI_NAME,

      KeyConditionExpression: "GSI1PK = :canteen",

      ExpressionAttributeValues: {
        ":canteen": `CANTEEN#${config.CANTEEN_ID}`,
      },

      ScanIndexForward: true,
    })
  );

  return (result.Items || []).filter(
    (order) =>
      order.status === "ORDERED" ||
      order.status === "PREPARING" ||
      order.status === "READY"
  );
}

async function getOrderById(orderId) {
  const result = await db.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `ORDER#${orderId}`,
        SK: "ORDER",
      },
    })
  );

  return result.Item;
}

async function updateOrderStatus(orderId, newStatus) {
  if (!VALID_STATUSES.includes(newStatus)) {
    throw new Error("Invalid order status");
  }

  const order = await getOrderById(orderId);

  if (!order) {
    throw new Error("Order not found");
  }

  const expectedNextStatus =
    STATUS_TRANSITIONS[order.status];

  if (expectedNextStatus !== newStatus) {
    throw new Error(
      `Invalid status transition: ${order.status} → ${newStatus}`
    );
  }

  const now = new Date().toISOString();

  const result = await db.send(
    new UpdateCommand({
      TableName: TABLE_NAME,

      Key: {
        PK: `ORDER#${orderId}`,
        SK: "ORDER",
      },

      UpdateExpression:
        "SET #status = :status, updatedAt = :updatedAt",

      ExpressionAttributeNames: {
        "#status": "status",
      },

      ExpressionAttributeValues: {
        ":status": newStatus,
        ":updatedAt": now,
      },

      ReturnValues: "ALL_NEW",
    })
  );

  return result.Attributes;
}

async function collectOrder(orderId) {
  return updateOrderStatus(orderId, "COLLECTED");
}

module.exports = {
  getActiveOrders,
  getOrderById,
  updateOrderStatus,
  collectOrder,
};