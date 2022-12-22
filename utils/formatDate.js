const formatDate = function (timestamp) {
//Create a date object from the timestamp
  const date = new Date(timestamp);

// Create a list of names for the months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',	'November', 'December'];

// return a formatted date
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

};

module.exports = formatDate