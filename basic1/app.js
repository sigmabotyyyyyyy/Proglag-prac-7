const content = document.querySelector('#content');
const tabs = [...document.querySelectorAll('[data-page]')];
const data = {
  first: [
    {icon:'◈',title:'Student Dashboard',type:'Web application',description:'Панель студента с модульной навигацией, карточками и удобным интерфейсом.'},
    {icon:'⌘',title:'NailHub',type:'Booking service',description:'Сервис онлайн-записи с выбором услуги, времени и контролем заявок.'},
    {icon:'◇',title:'Finance Tracker',type:'Fintech concept',description:'Концепция отслеживания расходов, категорий покупок и личного бюджета.'}
  ],
  second: [
    {icon:'⌨',title:'Разработка',type:'Frontend',description:'HTML5, CSS3, JavaScript, создание адаптивных страниц и работа с DOM.'},
    {icon:'⚙',title:'Инструменты',type:'Developer tools',description:'VS Code, Git, GitHub, базовый Python и проектная организация файлов.'},
    {icon:'✦',title:'Рабочий подход',type:'Soft skills',description:'Внимание к деталям, коммуникация, тестирование и командная работа.'}
  ],
  third: [
    {icon:'◎',title:'О студенте',type:'ИС 25-22',description:'Манкеев Жанибек. Изучаю информационные системы и создание удобных цифровых продуктов.'},
    {icon:'↗',title:'Цель',type:'Развитие',description:'Развивать навыки frontend-разработки и создавать практичные веб-приложения.'},
    {icon:'✉',title:'Связь',type:'Учебные проекты',description:'Связаться можно через учебную группу ИС 25-22.'}
  ]
};
const titles = {first:'Избранные проекты',second:'Технологии и навыки',third:'Кратко обо мне'};
let current = 'first';
function el(tag,cls,txt){const node=document.createElement(tag);if(cls)node.className=cls;if(txt!==undefined)node.textContent=txt;return node;}
function render(page){current=page;content.replaceChildren();content.setAttribute('aria-labelledby',`tab-${page}`);tabs.forEach(t=>t.setAttribute('aria-selected',String(t.dataset.page===page)));const head=el('div','main-heading');head.append(el('h2','',titles[page]));head.append(el('span','muted',`${data[page].length} раздела`));content.append(head);const grid=el('div','grid');data[page].forEach(x=>{const card=el('article','panel');card.append(el('div','feature',x.icon));card.append(el('span','tag',x.type));card.append(el('h3','',x.title));card.append(el('p','',x.description));grid.append(card);});content.append(grid);}
tabs.forEach(tab=>tab.addEventListener('click',()=>render(tab.dataset.page)));
document.querySelector('.nav').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=tabs.indexOf(document.activeElement);const next=e.key==='Home'?0:e.key==='End'?tabs.length-1:(n+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[next].focus();render(tabs[next].dataset.page);});
render('first');
