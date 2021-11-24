import snImg from '@/assets/sn.png';
import accountImg from '@/assets/account.png';

const routersConfig = [
  {
    name: '账户配置',
    id: '01',
    key: '01',
    parentId: '0',
    deep: 1,
    url: accountImg,
    children: [{
        name: '用户配置',
        id: '0101',
        key: '0101',
        parentId: '01',
        path: '/home/user',
        deep: 2,
      },
      {      
        name: '角色配置',
        id: '0202',  
        key: '0202',
        parentId: '02',
        deep: 2,
        path: '/home/role',
      }
    ],
  },
  {
    name: '菜单一',
    id: '02',
    key: '02',
    parentId: '0',
    deep: 1,
    url: snImg,
    children: [
      {
        name: '子菜单一',
        id: '0201',
        key: '0201',
        parentId: '02',
        deep: 2,
        path: '/home/partmain',
        children: [
          {
            name: '菜单三',
            id: '020101',
            key: '020101',
            parentId: '0201',
            deep: 3,
            path: '/home/apply'
          }
        ]
      },{
        name: '子菜单二',
        id: '0202',
        key: '0202',
        parentId: '02',
        deep: 2,
        path: '/home/midpromain',
        children: [
          {
            name: '菜单四',
            id: '020201',
            key: '020201',
            parentId: '0202',
            deep: 3,
            path: '/home/product'
          }
        ]
      }
    ]
  }
 
]

export { routersConfig };

