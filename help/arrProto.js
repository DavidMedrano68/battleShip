export const hasProto = () => {
  Array.prototype.Has = function (arr) {
    return this.some((coord) => {
      return coord[0] == arr[0] && coord[1] == arr[1];
    });
  };
};
