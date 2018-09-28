export default {
  install: function(Vue, option) {
    Vue.prototype.getDaysLeft = (
      deadline,
      containsToday = true,
      now = new Date()
    ) => {
      return (
        (new Date(
          deadline.getFullYear(),
          deadline.getMonth() + 1,
          deadline.getDate()
        ) -
          new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())) /
          1000 /
          60 /
          60 /
          24 +
        (containsToday ? 1 : 0)
      );
    };
  }
};
