export const categories = {
  sofas: { _id: '61d418865b03a1d82d07e171', name: 'Sofas' },
  chairs: { _id: '61d418867bc320b8be642e7f', name: 'Chairs' },
  tables: { _id: '61d41886e75896949e7f9f8d', name: 'Tables' },
  storage: { _id: '61d41886d52219aa2edaea54', name: 'Storage' },
  beds: { _id: '61d41886d0adb872da958d08', name: 'Beds' },
  lighting: { _id: '61d41886a94cdb135c480e7e', name: 'Lighting' },
  textiles: { _id: '61d41886b93311bff4319a6b', name: 'Textiles' },
  decor: { _id: '61d418867620415b84172281', name: 'Decor' },
  garden: { _id: '61d41886bdce2f572bcb7a49', name: 'Garden' },
  kitchen: { _id: '61d41886878ecfbf821dcd33', name: 'Kitchen' },
  lifestyle: { _id: '61d41886fd15585e3956b346', name: 'Lifestyle' }
};

// Making array from object:
const categoriesArray = [];
for (const item in categories) {
  categoriesArray.push(categories[item]);
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(categoriesArray);
    }, 1000);
  });

const result = {
  fetchAll,
  categoriesArray
};

export default result;
