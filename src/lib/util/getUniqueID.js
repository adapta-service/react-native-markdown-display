let uuid = Date.now();

export default function getUniqueID() {
  uuid++;
  return `rnmr_${uuid.toString(16)}`;
}
