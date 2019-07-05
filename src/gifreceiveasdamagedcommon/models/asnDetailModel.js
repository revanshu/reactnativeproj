const asnDetailModel = (asnDetail) => {
  const asn = {};
  asn.orderNumber = asnDetail.custOrdNbr;
  asn.packageId = asnDetail.packageId;
  asn.orderStatus = asnDetail.fulfillOrdStatusDesc;
  asn.isReceiveDamage = asnDetail.isReceiveDamage;

  return Object.freeze(asn);
};

export default asnDetailModel;
