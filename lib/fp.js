const prop = key => obj=> obj[key];
const lift2 = a => b => f => b.ap(a.map(f));


module.exports = {prop, lift2}