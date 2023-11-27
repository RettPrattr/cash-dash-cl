import delve from "dlv";

// This functionn can merge required data but it is not used here.
export async function checkRequiredData(block) {
  return block;
}

// This function will get the data dependencies for every blocks. !!!
export default async function getDataDependencies(json) {
  let blocks = await delve(json, "blocks", []);
  
  // console.log('blocks', json)
  if (blocks !== 0 && blocks !== undefined && blocks.length > 0)
    {blocks = await Promise.all(blocks?.map(checkRequiredData))}

  return {
    ...json,
    blocks,
  };
}