interface BatchContractWithAddress {
  address: string;
}

interface BatchContractWithMetadata {
  name: string;
  uri: string;
}

type BatchContract = BatchContractWithAddress | BatchContractWithMetadata;

const buildBatchContract = (
  collection: string | null | undefined,
  firstItemName: string,
  firstMetadataUri: string
): BatchContract => {
  if (collection) return { address: collection };
  return { name: firstItemName, uri: firstMetadataUri };
};

export default buildBatchContract;
