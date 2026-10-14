const content=document.querySelector('#content');
const tabs=[...document.querySelectorAll('[data-page]')];
const labels={first:'Все задачи',second:'Активные задачи',third:'Выполненные задачи'};
const starter=[{id:1,title:'Подготовить лабораторную №7',done:true},{id:2,title:'Повторить DOM и события',done:false},{id:3,title:'Оформить проект для сдачи',done:false}];
let tasks;
try{const saved=JSON.parse(localStorage.getItem('lab7_tasks'));tasks=Array.isArray(saved)&&saved.every(x=>typeof x.id==='number'&&typeof x.title==='string'&&typeof x.done==='boolean')?saved:starter;}catch{tasks=starter;}
let current='first';
const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e;};
const button=(name,cls,fn)=>{const b=el('button',`button ${cls}`,name);b.type='button';b.addEventListener('click',fn);return b;};
function save(){try{localStorage.setItem('lab7_tasks',JSON.stringify(tasks));}catch{}}
function addTask(value){const title=value.trim();if(!title||title.length>100)return false;tasks.unshift({id:Date.now()+Math.random(),title,done:false});save();render();return true;}
function toggle(id){tasks=tasks.map(x=>x.id===id?{...x,done:!x.done}:x);save();render();}
function remove(id){tasks=tasks.filter(x=>x.id!==id);save();render();}
function render(){content.replaceChildren();content.setAttribute('aria-labelledby',`tab-${current}`);tabs.forEach(t=>{const count=current==='first'?tasks.length:t.dataset.page==='second'?tasks.filter(x=>!x.done).length:tasks.filter(x=>x.done).length;t.setAttribute('aria-selected',String(t.dataset.page===current));});const h=el('div','main-heading');h.append(el('h2','',labels[current]));h.append(el('span','inline-badge',`${tasks.filter(x=>x.done).length} из ${tasks.length} выполнено`));content.append(h);
if(current==='first'){const form=el('form','toolbar');const input=el('input','input');input.placeholder='Например: закончить отчёт';input.maxLength=100;input.required=true;input.setAttribute('aria-label','Новая задача');const add=el('button','button','+ Добавить задачу');add.type='submit';form.append(input,add);form.addEventListener('submit',e=>{e.preventDefault();if(addTask(input.value))input.value='';});content.append(form);}
const selected=tasks.filter(x=>current==='first'||(current==='second'?!x.done:x.done));if(!selected.length){content.append(el('div','empty','Здесь пока нет задач. Добавьте задачу или переключите вкладку.'));return;}const list=el('div','item-list');selected.forEach(t=>{const item=el('article','item');const info=el('div');info.append(el('h3','',t.title));info.append(el('p','',t.done?'✓ Выполнено':'○ В процессе'));const actions=el('div','actions');actions.append(button(t.done?'Вернуть':'Завершить','secondary',()=>toggle(t.id)));actions.append(button('Удалить','danger',()=>remove(t.id)));item.append(info,actions);list.append(item);});content.append(list);}
tabs.forEach(t=>t.addEventListener('click',()=>{current=t.dataset.page;render();}));
document.querySelector('.nav').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=tabs.indexOf(document.activeElement);const i=e.key==='Home'?0:e.key==='End'?2:(n+(e.key==='ArrowRight'?1:-1)+3)%3;tabs[i].focus();current=tabs[i].dataset.page;render();});
render();
