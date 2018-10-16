const menu = {
  menuList: [
    {
      index: 0,
      label: '查看任务',
      router: '/',
      child: {
        menuList: [
          { index: 0, label: '进行中' },
          { index: 1, label: '所有任务' },
          { index: 2, label: '未开始' },
          { index: 3, label: '已完成' },
          { index: 4, label: '已暂停' },
          { index: 5, label: '已关闭' },
          { index: 6, label: '已取消' }
        ],
        activedIndex: 0
      }
    },
    {
      index: 1,
      label: '查看需求',
      router: '/story',
      child: {
        menuList: [
          { index: 0, label: '研发中' },
          { index: 1, label: '所有需求' },
          { index: 2, label: '未开始' },
          { index: 3, label: '测试中' },
          { index: 4, label: '测试完毕' },
          { index: 5, label: '已立项' },
          { index: 6, label: '已发布' },
          { index: 7, label: '研发完毕' },
          { index: 8, label: '已关闭' },
          { index: 9, label: '已取消' }
        ],
        activedIndex: 0
      }
    }
  ],
  activedIndex: 0
};
export default menu;
