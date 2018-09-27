const menu = {
  menuList: [
    {
      index: 0,
      label: '查看任务',
      router: '/',
      child: {
        menuList: [
          { index: 0, label: '所有任务' },
          { index: 1, label: '正在进行中的任务' },
          { index: 2, label: '未开始的任务' },
          { index: 3, label: '已经完成任务' },
          { index: 4, label: '已经取消的任务' },
          { index: 5, label: '已暂停的任务' }
        ],
        activedIndex: 0
      }
    },
    {
      index: 1,
      label: '查看需求',
      router: '/story',
      child: {
        menuList: [{ index: 0, label: '所有需求' }],
        activedIndex: 0
      }
    }
  ],
  activedIndex: 0
};
export default menu;
