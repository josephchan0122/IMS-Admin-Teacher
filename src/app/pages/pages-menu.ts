import { NbMenuItem } from '@nebular/theme';
import { title } from 'process';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/dashboard',
  //   home: true,
  // },
  {
    title: 'Teachers',
    icon: 'people-outline',    
    children:[
      {
        title:'List',
        link: '/users',
      },
      {
        title:'New',
        link: '/users/new',
      }
    ]
  },
  {
    title: 'Children',
    icon: 'globe-outline',
    link:'/children',
    home:true
  },
  {
    title: 'Pictures',
    icon: 'image-outline',
    link: '/admin/pictures/'
  },
  {
    title:'School Documents',
    icon:{
      icon:'book',
      pack:'fa'
    },
    link: '/schooldocuments'
  },
  {
    title:'Message Center',
    icon:{
      icon:'inbox',
      pack:'fa'
    },
    children:[
      {
        title:'Inbox',
        link: '/messagecenter',
      },
      {
        title:'Compose',
        link:'/messagecenter/compose'
      }
    ]
  },
  {
    title:'Child Daily Information',
    icon:'credit-card-outline',
    children:[
      {
        title:'Add Meal',
        link:'/menuofyear/food/new'
      },
      {
        title: 'Menu of This Year',
        link: '/menuofyear'
      }
    ]
  },
  {
    title: 'Appointment Center',
    icon: 'calendar-outline',
    children:[
      {
        title:'List',
        link: '/appointment',
      },
      {
        title:'Register',
        
        children:[
          {
            title:'New Appointment',
            link:'/appointment/new',
          },
          {
            title:'New Preset Appointment',
            link:'/appointment/new/preset'
          }
        ]
      },
      {
        title:'Preset',
        link:'/appointment/preset'
      }
    ]
  },
  {
    title:'Notifications',
    icon:'bell-outline',
    children:[
      {
        title:'New',
        link:'/notification/send'
      },
      {
        title:'Sent Notifications',
        link:'/notification'
      }
    ]
  },
  {
    title:'Mini Club',
    icon:'speaker-outline',
    link:'/miniclub'    
  },
  {
    title:'Exchange Library',
    icon:'book-outline',
    link:'/exchangelibrary'    
  },
  {
    title:'Marketing',
    icon:'globe-2-outline',
    link:'/marketing'
  }
  
  // {
  //   title: 'ListStudent',
  //   icon: 'menu-outline',
  //   link: '/list'    
  // },
  // {
  //   title: 'AddStudent',
  //   icon: 'plus-outline',
  //   link: '/add'
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];

export const TEACHER_MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Children',
    icon: 'globe-outline',
    link:'/children',
    home:true
  },
  {
    title: 'Pictures',
    icon: 'image-outline',
    children: [
      {
        title: 'Add',
        link: '/teacher/pictures/'
      },
      {
        title: 'List',
        link: '/teacher/pictures'
      }
    ]
  },
  {
    title:'School Documents',
    icon:{
      icon:'book',
      pack:'fa'
    },
    link: '/teacher/schooldocuments'
  },
  {
    title:'Message Center',
    icon:{
      icon:'inbox',
      pack:'fa'
    },
    children:[
      {
        title:'Inbox',
        link: '/teacher/messagecenter',
      },
      {
        title:'Compose',
        link:'/teacher/messagecenter/compose'
      }
    ]
  },
  {
    title:'Child Daily Information',
    icon:'credit-card-outline',
    link:'/teacher/childdailyinformation'
    
  },
  {
    title: 'Appointment Center',
    icon: 'calendar-outline',
    children:[
      {
        title:'List',
        link:'/teacher/appointment'
      },      
      {
        title:'Request Meeting',
        link:'/teacher/appointment/request'
      },
      {
        title: 'Preset',
        link: '/teacher/preset'
      }
    ]
  },
  // {
  //   title:'Notifications',
  //   icon:'bell-outline',
  //   children:[
  //     {
  //       title:'Send',
  //       link:'/notification/send'
  //     }
      
  //   ]

  // },
  
  // {
  //   title: 'ListStudent',
  //   icon: 'menu-outline',
  //   link: '/list'    
  // },
  // {
  //   title: 'AddStudent',
  //   icon: 'plus-outline',
  //   link: '/add'
  // },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
