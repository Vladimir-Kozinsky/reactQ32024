const parsUrl = (url: string) => {
  const parcedArr = url.split('/');
  const pesoneId = parcedArr[parcedArr.length - 2];
  return pesoneId;
};

export default parsUrl;
