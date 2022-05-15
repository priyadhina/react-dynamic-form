export const fetchData = () => {
  return fetch('https://ulventech-react-exam.netlify.app/api/form')
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.data;
    });
};

export const postData = (requestContent) => {
  const data = transformData(requestContent);
  return fetch('https://ulventech-react-exam.netlify.app/api/form', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      return jsonResponse;
    })
    .catch((error) => {
      console.log(error);
    });
};

const transformData = (data) => {
  const finalObj = {};
  data.map((field) => {
    finalObj[field.fieldName] = field.value;
  });
  return finalObj;
};
