const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const capitalized = string => string.charAt(0).toUpperCase() + string.slice(1);

const msToDays = ms => Math.floor((((ms/1000)/60)/60)/24);

export default { uuidv4, capitalized, msToDays };