import { User, USERROLE } from "./models/user";
import { Message,MessageType } from "../@core/models/message";
import * as moment from 'moment';
import { CalendarEvent } from "angular-calendar";
import { COLOR,colors, Appointment, AppointmentType, PresetItem, PresetType, AppointmentStatus, TimeRangeItem, PresetRecord, PresetStatus, PresetAppointment } from "./models/appointment";
import { Food, MenuItem } from './models/meal-menu';
import { WeekNameList,DayNameListForMenu } from "./constants";
import { Picture } from './models/picture';
import { Child, NameOfClass, ChildDailyInformation, EmergencyContact, AuthPersonContact } from './models/child';
import { Document, DocumentFor } from './models/document';
import { MiniClub } from './models/miniclub';
import { BookStatus, ExchangeLibrary } from './models/exchangelibrary';
export let users:User[] = [
    { id:1, username:"nickjones" ,first_name:"Nick", last_name:"Jones", picture: 'assets/images/nick.png', role:USERROLE.Admin, email:'nick@jone.com'},
    { id:2, username:"katemartineze" ,first_name:"Kate", last_name:"Martinez", picture: 'assets/images/eva.png',role:USERROLE.Teacher,email:'kate@martine.com', classNames:[NameOfClass.Acajou, NameOfClass.Bamboo]},
    { id:3, username:"evamoor" ,first_name:"Eva", last_name:"Moor", picture: 'assets/images/jack.png', role:USERROLE.Parent,email:'eva@moor.com'},
    { id:4, username:"jackwilliam" ,first_name:"Jack", last_name:"Williams", picture: 'assets/images/lee.png', role:USERROLE.Teacher,email:'jack@william.com', classNames:[NameOfClass.Iroko, NameOfClass.Baobab]},
    { id:5, username:"leewong" ,first_name:"Lee", last_name:"Wong", picture: 'assets/images/alan.png', role:USERROLE.Parent,email:'lee@wong.com'},
    { id:6, username:"alanthompson" ,first_name:"Alan", last_name:"Thompson", picture: 'assets/images/kate.png', role:USERROLE.Teacher,email:'ala@thompson.com',classNames:[NameOfClass.Baobab]}
];
export let emgencyContacts:EmergencyContact[]=[
  { name:' emegerncy name1', email:'a@a.com', phone_number:'1234234'},
  { name:' emegerncy name2', email:'a@a.com', phone_number:'1234234'},
  { name:' emegerncy name3', email:'a@a.com', phone_number:'1234234'},
]
export let authPersons:AuthPersonContact[]=[
  {first_name:users[0].first_name, last_name:users[0].first_name,photo:users[0].picture,phone_number:'123456'},
  {first_name:users[1].first_name, last_name:users[1].last_name,photo:users[1].picture, phone_number:'23425435'},
  {first_name:users[2].first_name, last_name:users[2].last_name,photo:users[2].picture, phone_number:'23425435'},
]
export let children:Child[]=[
  
  { id:1, first_name:"Emma", last_name:"Jones", photo: 'assets/images/childs/emma.jpg', birth:'2019',gender:'male',nationality:'', address:'', nameOfClass:NameOfClass.Acajou, parent:users[2], siblings:[]},
  { id:2, first_name:"Olivia", last_name:"Martinez", photo: 'assets/images/childs/olivia.jpg',birth:'2019',gender:'male',nationality:'', address:'', nameOfClass:NameOfClass.Bamboo, parent:users[4], siblings:[]},
  { id:3, first_name:"Ava", last_name:"Moor", photo: 'assets/images/childs/ava.jpg',birth:'2019',gender:'male',nationality:'', address:'', nameOfClass:NameOfClass.Baobab, parent:users[2],  emergenyContacts:emgencyContacts, authPersons:authPersons, allgeries:"sfsdfsdf dsfsdf sdfsd", siblings:[]},
  { id:4, first_name:"Isabella", last_name:"Williams", photo: 'assets/images/childs/isabella.jpg',birth:'2019',gender:'male',nationality:'', address:'', nameOfClass:NameOfClass.Iroko, parent:users[2], siblings:[]},
  { id:5, first_name:"Sophia", last_name:"Wong", photo: 'assets/images/childs/sophia.jpg',birth:'2019',gender:'male',nationality:'', address:'', nameOfClass:NameOfClass.Acajou, parent:users[4], siblings:[]},
  { id:6, first_name:"Mia", last_name:"Thompson", photo: 'assets/images/childs/mia.jpg',birth:'2019',gender:'male',nationality:'', address:'', nameOfClass:NameOfClass.Iroko, parent:users[2], siblings:[]}
]

export let user:User=users[1];
export let pictures:Picture[] =[
    {image:'assets/images/childs/img-sandwitch.png'},
    {image:'assets/images/childs/img-select.png'},
    {image:'assets/images/childs/img-select2.png'},
    {image:'assets/images/childs/img-select3.png'},
    {image:'assets/images/childs/img-select4.png'},
    {image:'assets/images/childs/img-mangojuice.png'}
]
export let documents:Document[] =[
    { id:0, name:'School Calendar', url:"https://www.google.com", documentfor:DocumentFor.All},
    { id:1, name:'Routine of the Day', url:"https://www.google.com", documentfor:DocumentFor.Classroom},    
    { id:2, name:'School Menu', url:"https://www.google.com", documentfor:DocumentFor.All},
    { id:3, name:'Routine supplies to buy', url:"https://www.google.com", documentfor:DocumentFor.Classroom},    
    { id:4, name:'Rule Book', url:"https://www.google.com", documentfor:DocumentFor.Classroom},
    { id:5, name:'Our Documents', url:"https://www.google.com", documentfor:DocumentFor.All}
]
export let messages:Message[] = [
    {   
        id:1, subject:"Hello World!", child:children[0], sender:users[1], receiver:users[2],
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
        msgType:MessageType.Normal, attachedFiles:pictures, created_at:"2019-08-06 00:30:33",headerMessage:-1,is_read:false
    },
    {   
        id:2, subject:"Hello World!", child:children[1], sender:users[3], receiver:users[2],
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
        msgType:MessageType.Normal, attachedFiles:pictures, created_at:"2019-08-06 22:30:33",headerMessage:1, is_read:false
    },
    {   
        id:3, subject:"Hello World!", child:children[2], sender:users[2], receiver:users[3],
        content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
        msgType:MessageType.Normal, attachedFiles:pictures, created_at:"2019-08-06 21:30:33",headerMessage:1, is_read:false
    }
]
export let deepMessages:Message[]=[
  {   
    id:1, subject:"Hello World!", child:children[0], sender:users[1], receiver:users[2],
    content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
    msgType:MessageType.Normal, attachedFiles:pictures, created_at:"2019-08-06 00:30:33",headerMessage:-1, is_read:false
  },
  {   
    id:2, subject:"Hello World!",child:children[0],  sender:users[2], receiver:users[1],
    content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
    msgType:MessageType.Normal, attachedFiles:pictures, created_at:"2019-08-06 22:30:33",headerMessage:1, is_read:false
  },
  {   
    id:3, subject:"Hello World!", child:children[0], sender:users[2], receiver:users[1],
    content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
    msgType:MessageType.Normal, attachedFiles:pictures, created_at:"2019-08-06 21:30:33",headerMessage:1, is_read:false
  },
  {   
    id:4, subject:"Hello World!", child:children[0], sender:users[1], receiver:users[2],
    content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", 
    msgType:MessageType.Normal, attachedFiles:pictures, created_at:"2019-08-06 21:30:33",headerMessage:1, is_read:false
  }
]
export let appointmentsOfOneUser: Appointment[]=[
  { id:0, title:"A 3 day event",start:moment().subtract(2,'d').toDate(), end:moment().add(1,'d').toDate(), color:COLOR.Red, type:AppointmentType.FREE, teacher:users[2], parent:users[3], child:children[0], status:AppointmentStatus.CONFIRM},
  { id:1, title:"A 1 day event",start:moment().subtract(5,'d').toDate(), end:moment().subtract(4,'d').toDate(), color:COLOR.Blue, type:AppointmentType.FREE, teacher:users[2], parent:users[3], child:children[1], status:AppointmentStatus.CONFIRM},
  { id:2, title:"A 3 day event",start:moment().add(5,'d').toDate(), end:moment().add(6,'d').toDate(), color:COLOR.Yellow, type:AppointmentType.FREE, teacher:users[4], parent:users[5], child:children[2], status:AppointmentStatus.PENDING},
  { id:3, title:"20 minutes event",start:moment().toDate(), end:moment().add(20,'minutes').toDate(), color:COLOR.Yellow, type:AppointmentType.FREE, teacher:users[4], parent:users[5], child:children[3], status:AppointmentStatus.PENDING},
  { id:4, title:"20 minutes event",start:moment().toDate(), end:moment().add(20,'minutes').toDate(), color:COLOR.Yellow, type:AppointmentType.FREE, teacher:users[4], parent:users[5], child:children[0], status:AppointmentStatus.PENDING},
  { id:5, title:"PRESET APPOINTMENT",start:moment().add(3,'d').toDate(), end:moment().add(4,'d').toDate(), color:COLOR.Preset, type:AppointmentType.PRESET, teacher:users[4], parent:users[5], presetType:PresetType.Kindergarten, child:undefined, status:AppointmentStatus.PENDING},  
];
export let events: CalendarEvent[] = [
    {
      start: moment().subtract(2,'d').toDate(),
      end: moment().add(1,'d').toDate(),
      title: 'A 3 day event',
      color: colors.red,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: moment().startOf('day').toDate(),
      title: 'An event with no end date',
      color: colors.yellow,
    },
    {
      start: moment().startOf('month').subtract(3,'months').toDate(),
      end: moment().endOf('month').add(5,'days').toDate(),
      title: 'A long event that spans 2 months',
      color: colors.blue,
    },
    {
      start: moment().subtract(2,'hours').toDate(),
      end: moment().add(2,'hours').toDate(),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
export let timeranges:TimeRangeItem[]=[
    { id:1, startTime:moment().startOf('hour').subtract(2,'hours').toDate(), endTime:moment().startOf('hour').add(2,'hours').toDate(),date:moment().startOf('day').toDate() },
    { id:2, startTime:moment().add(1,'days').startOf('hour').subtract(4,'hours').toDate(), endTime:moment().add(1,'days').startOf('hour').add(2,'hours').toDate(),date:moment().add(1,'days').startOf('day').toDate() },
    { id:3, startTime:moment().add(2,'days').startOf('hour').add(4,'hours').toDate(), endTime:moment().add(2,'days').startOf('hour').add(8,'hours').toDate(),date:moment().add(2,'days').startOf('day').toDate() },
    { id:4, startTime:moment().add(3,'days').startOf('hour').add(6,'hours').toDate(), endTime:moment().add(3,'days').startOf('hour').add(12,'hours').toDate(),date:moment().add(3,'days').startOf('day').toDate() }
  ]
export let presetItems:PresetItem[]=[
    {id:1, timeranges:timeranges, duration:20, classroom:NameOfClass.Acajou},
    {id:2, timeranges:timeranges, duration:20, classroom:NameOfClass.Bamboo},
    {id:3, timeranges:timeranges, duration:20, classroom:NameOfClass.Baobab},
    {id:4, timeranges:timeranges, duration:20, classroom:NameOfClass.Iroko},

  ]
export let presetInfos:PresetRecord[] =[{
    id:0,
    presetItems:presetItems,
    closeDateTime:moment().startOf('day').add(7,'days').toDate(),
    status:PresetStatus.BeforeStart
  }
]
export let presetApnts: PresetAppointment[]=[];
export let foods:Food[]=[
  {
    id:0,
    picture:"https://eu2prddennyscdnstr.blob.core.windows.net/cms/menu/product/berry-vanilla-crepe-breakfast_imagesmall_2019-10-28-21-29-03.jpg",
    name:"Berry Vanilla Crepe Breakfast",
    description:"SDFSDF"
  },
  {
    id:1,
    picture:"https://eu2prddennyscdnstr.blob.core.windows.net/cms/menu/product/banana-chocolate-hazelnut-crepe-breakfast_imagesmall_2019-09-23-13-07-11.jpg",
    name:"Banana Chocolate Hazelnut Crepe Breakfast",
    description:"sdfsdf"
  },
  {
    id:2,
    picture:"https://eu2prddennyscdnstr.blob.core.windows.net/cms/menu/product/americas-diner-double_imagesmall_2019-06-12-22-59-23.jpg",
    name:"America's Diner Double",
    description:""
  },
  {
    id:3,
    picture:"https://eu2prddennyscdnstr.blob.core.windows.net/cms/menu/product/ultimate-omelette_imagesmall_2019-07-23-01-05-21.jpg",
    name:"Ultimate Omelette",
    description:""
  },
  {
    id:4,
    picture:"https://eu2prddennyscdnstr.blob.core.windows.net/cms/menu/product/ultimate-omelette_imagesmall_2019-07-23-01-05-21.jpg",
    name:"Ultimate Omelette",
    description:""
  },
  {
    id:5,
    picture:"https://eu2prddennyscdnstr.blob.core.windows.net/cms/menu/product/banana-chocolate-hazelnut-crepe-breakfast_imagesmall_2019-09-23-13-07-11.jpg",
    name:"Banana Chocolate Hazelnut Crepe Breakfast",
    description:""
  },
  {
    id:6,
    picture:"https://eu2prddennyscdnstr.blob.core.windows.net/cms/menu/product/americas-diner-double_imagesmall_2019-06-12-22-59-23.jpg",
    name:"America's Diner Double",
    description:""
  },
  {
    id:7,
    picture:"https://eu2prddennyscdnstr.blob.core.windows.net/cms/menu/product/ultimate-omelette_imagesmall_2019-07-23-01-05-21.jpg",
    name:"Ultimate Omelette",
    description:""
  },
];

export let menuItems:MenuItem[]=[
  {
    id:0,
    weekName:WeekNameList[0].key,
    dayName:DayNameListForMenu[0],
    foods:foods
  },
  {
    id:1,
    weekName:WeekNameList[0].key,
    dayName:DayNameListForMenu[1],
    foods:foods
  },
  {
    id:2,
    weekName:WeekNameList[1].key,
    dayName:DayNameListForMenu[0],
    foods:foods
  },
  {
    id:3,
    weekName:WeekNameList[1].key,
    dayName:DayNameListForMenu[1],
    foods:foods
  },
  {
    id:4,
    weekName:WeekNameList[1].key,
    dayName:DayNameListForMenu[1],
    foods:foods
  }


]
export let childDailyInformations:ChildDailyInformation[]=[
  {
    id:1, child:children[0],ate:1, ate_comment:'Test Commnet',menu:menuItems[0],comment:"Comment for Menu", nap_start_time:moment().toDate(), nap_end_time:moment().add(2,'hours').toDate(),is_bowel_move:false,bowel_movement_time:2,injures:[],    
  },
  {
    id:2, child:children[1],ate:1, ate_comment:'Test Commnet',menu:menuItems[0],comment:"Comment for Menu", nap_start_time:moment().toDate(), nap_end_time:moment().add(2,'hours').toDate(),is_bowel_move:false,bowel_movement_time:2,injures:[],    
  },
  {
    id:3, child:children[2],ate:1, ate_comment:'Test Commnet',menu:menuItems[0],comment:"Comment for Menu", nap_start_time:moment().toDate(), nap_end_time:moment().add(2,'hours').toDate(),is_bowel_move:false,bowel_movement_time:2,injures:[],    
  }
]
let sampleComment = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
export let miniClubs:MiniClub[]=[
  {id:0, children:[children[0]], title:'Test World', price:10, date:moment().toDate(), limit:10,comment:sampleComment },
  {id:1, children:[children[1]], title:'Hello World', price:10, date:moment().toDate(), limit:10,comment:sampleComment },
  {id:2, children:[children[2]], title:'Thank You World', price:10, date:moment().toDate(), limit:10,comment:sampleComment },
  {id:3, children:[children[3]], title:'Our World', price:10, date:moment().toDate(), limit:10,comment:sampleComment },

];

export let books:ExchangeLibrary[]=[
  {id:0, title:'Hello Book', picture:pictures[0].image,status:BookStatus.PRESENT},
  {id:1, title:'Test Book', picture:pictures[0].image,status:BookStatus.PRESENT},
  {id:2, title:'Thank You Book', picture:pictures[0].image,status:BookStatus.RENTED, child:children[0]},
  {id:3, title:'God Book', picture:pictures[0].image,status:BookStatus.PRESENT}

]