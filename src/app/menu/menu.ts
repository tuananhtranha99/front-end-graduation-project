import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Apps & Pages
  {
    id: 'invoice-list',
    title: 'Danh sách đơn đặt hàng',
    translate: 'MENU.APPS.INVOICE.LIST',
    type: 'item',
    icon: 'circle',
    url: 'apps/invoice/list'
    // id: 'apps',
    // type: 'section',
    // title: 'Quản lý đơn đặt hàng',
    // translate: 'MENU.APPS.SECTION',
    // icon: 'package',
    // children: [
    //   {
    //     id: 'invoice',
    //     title: 'Invoice',
    //     translate: 'MENU.APPS.INVOICE.COLLAPSIBLE',
    //     type: 'collapsible',
    //     icon: 'file-text',
    //     children: [
    //       {
    //         id: 'invoice-list',
    //         title: 'List',
    //         translate: 'MENU.APPS.INVOICE.LIST',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'apps/invoice/list'
    //       },
    //       {
    //         id: 'invoicePreview',
    //         title: 'Preview',
    //         translate: 'MENU.APPS.INVOICE.PREVIEW',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'apps/invoice/preview'
    //       },
    //       {
    //         id: 'invoiceEdit',
    //         title: 'Edit',
    //         translate: 'MENU.APPS.INVOICE.EDIT',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'apps/invoice/edit'
    //       },
    //       {
    //         id: 'invoiceAdd',
    //         title: 'Add',
    //         translate: 'MENU.APPS.INVOICE.ADD',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'apps/invoice/add'
    //       }
    //     ]
    //   },
      // {
      //   id: 'e-commerce',
      //   title: 'eCommerce',
      //   translate: 'MENU.APPS.ECOMMERCE.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'shopping-cart',
      //   children: [
      //     {
      //       id: 'shop',
      //       title: 'Shop',
      //       translate: 'MENU.APPS.ECOMMERCE.SHOP',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/shop'
      //     },
      //     {
      //       id: 'details',
      //       title: 'Details',
      //       translate: 'MENU.APPS.ECOMMERCE.DETAIL',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/details'
      //     },
      //     {
      //       id: 'wishList',
      //       title: 'Wish List',
      //       translate: 'MENU.APPS.ECOMMERCE.WISHLIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/wishlist'
      //     },
      //     {
      //       id: 'checkout',
      //       title: 'Checkout',
      //       translate: 'MENU.APPS.ECOMMERCE.CHECKOUT',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/checkout'
      //     }
      //   ]
      // },
      // {
      //   id: 'users',
      //   title: 'User',
      //   translate: 'MENU.APPS.USER.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'user',
      //   children: [
      //     {
      //       id: 'list',
      //       title: 'List',
      //       translate: 'MENU.APPS.USER.LIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/user/user-list'
      //     },
      //     {
      //       id: 'view',
      //       title: 'View',
      //       translate: 'MENU.APPS.USER.VIEW',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/user/user-view'
      //     },
      //     {
      //       id: 'edit',
      //       title: 'Edit',
      //       translate: 'MENU.APPS.USER.EDIT',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/user/user-edit'
      //     }
      //   ]
      // }
    // ]
  },
  {
      id: 'list',
      title: 'Danh sách sản phẩm',
      translate: 'MENU.APPS.USER.LIST',
      type: 'item',
      icon: 'circle',
      url: 'apps/user/user-list'
  }
  
];

export const menu2: CoreMenu[] = [
  // Apps & Pages
  {
    id: 'shop',
    title: 'Sản phẩm',
    translate: 'MENU.APPS.ECOMMERCE.SHOP',
    type: 'item',
    icon: 'circle',
    url: 'apps/e-commerce/shop'
    // id: 'apps',
    // type: 'section',
    // title: 'Quản lý đơn đặt hàng',
    // translate: 'MENU.APPS.SECTION',
    // icon: 'package',
    // children: [
    //   {
    //     id: 'invoice',
    //     title: 'Invoice',
    //     translate: 'MENU.APPS.INVOICE.COLLAPSIBLE',
    //     type: 'collapsible',
    //     icon: 'file-text',
    //     children: [
    //       {
    //         id: 'invoice-list',
    //         title: 'List',
    //         translate: 'MENU.APPS.INVOICE.LIST',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'apps/invoice/list'
    //       },
    //       {
    //         id: 'invoicePreview',
    //         title: 'Preview',
    //         translate: 'MENU.APPS.INVOICE.PREVIEW',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'apps/invoice/preview'
    //       },
    //       {
    //         id: 'invoiceEdit',
    //         title: 'Edit',
    //         translate: 'MENU.APPS.INVOICE.EDIT',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'apps/invoice/edit'
    //       },
    //       {
    //         id: 'invoiceAdd',
    //         title: 'Add',
    //         translate: 'MENU.APPS.INVOICE.ADD',
    //         type: 'item',
    //         icon: 'circle',
    //         url: 'apps/invoice/add'
    //       }
    //     ]
    //   },
      // {
      //   id: 'e-commerce',
      //   title: 'eCommerce',
      //   translate: 'MENU.APPS.ECOMMERCE.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'shopping-cart',
      //   children: [
      //     {
      //       id: 'shop',
      //       title: 'Shop',
      //       translate: 'MENU.APPS.ECOMMERCE.SHOP',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/shop'
      //     },
      //     {
      //       id: 'details',
      //       title: 'Details',
      //       translate: 'MENU.APPS.ECOMMERCE.DETAIL',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/details'
      //     },
      //     {
      //       id: 'wishList',
      //       title: 'Wish List',
      //       translate: 'MENU.APPS.ECOMMERCE.WISHLIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/wishlist'
      //     },
      //     {
      //       id: 'checkout',
      //       title: 'Checkout',
      //       translate: 'MENU.APPS.ECOMMERCE.CHECKOUT',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/e-commerce/checkout'
      //     }
      //   ]
      // },
      // {
      //   id: 'users',
      //   title: 'User',
      //   translate: 'MENU.APPS.USER.COLLAPSIBLE',
      //   type: 'collapsible',
      //   icon: 'user',
      //   children: [
      //     {
      //       id: 'list',
      //       title: 'List',
      //       translate: 'MENU.APPS.USER.LIST',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/user/user-list'
      //     },
      //     {
      //       id: 'view',
      //       title: 'View',
      //       translate: 'MENU.APPS.USER.VIEW',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/user/user-view'
      //     },
      //     {
      //       id: 'edit',
      //       title: 'Edit',
      //       translate: 'MENU.APPS.USER.EDIT',
      //       type: 'item',
      //       icon: 'circle',
      //       url: 'apps/user/user-edit'
      //     }
      //   ]
      // }
    // ]
  },
  {
          id: 'checkout',
          title: 'Giỏ hàng',
          translate: 'MENU.APPS.ECOMMERCE.CHECKOUT',
          type: 'item',
          icon: 'circle',
          url: 'apps/e-commerce/checkout'
        }
  
];