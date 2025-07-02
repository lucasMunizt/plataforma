import React from 'react'
import { useEffect, useState } from 'react';
import './Calendario.css'
import moment from 'moment';
import 'moment/locale/pt-br';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import Header from '../componentes/header/Header';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Modal from '../componentes/modal/Modal';
import { db } from '../data/Data';
//import { db } from '../data/Data';
import { collection,getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

const Calendario = () => {
    const localizer = momentLocalizer(moment);
    const [eventos, setEventos] = useState([]);
    const DragAndDropCalendar = withDragAndDrop(Calendar);
    const [eventoSelecionados, setEventoSelecionados] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);

    
  const listarEventos = async () => {
    try{
    
      const querySnapshot = await getDocs(collection(db, "agendamentos"));
      
     const eventosLista = querySnapshot.docs.map((doc) => {
        const data = doc.data() || {};
        const start = data.start?.seconds ? new Date(data.start.seconds * 1000) : new Date();
        const end = data.end?.seconds ? new Date(data.end.seconds * 1000) : new Date();

        return {
            id: doc.id,
            ...data,
            start,
            end,
        };
        });
    
        setEventos(eventosLista);
    }catch(erro){
    
        console.error("Erro ao listar eventos:",erro);
    }    
  };


  useEffect(() => {
    listarEventos();
  }, []);

    const messages = {
        date: 'Data',
        time: 'Hora',
        event: 'Evento',
        allDay: 'Dia todo',
        week: 'Semana',
        work_week: 'Semana de trabalho',
        day: 'Dia',
        month: 'Mês',
        previous: 'Anterior',
        next: 'Próximo',
        yesterday: 'Ontem',
        tomorrow: 'Amanhã',
        today: 'Hoje',
        agenda: 'Agenda',
        Sun: 'Domingo', // Alterado para o dia correto
        Mon: 'Segunda',
        Tue: 'Terça-feira',
        Wed: 'Quarta-feira',
        Thu: 'Quinta-feira',
        Fri: 'Sexta-feira',
        Sat: 'Sábado',
        Wednesday: 'Quarta-feira',
        noEventsInRange: 'Nenhum evento neste período.',
        showMore: total => `+ Ver mais (${total})`
    };
    
    const formats = {
        weekdayFormat: (date, culture, localizer) => {
            const day = moment(date).format('ddd'); // Get the full name of the day
            switch (day) {
                case 'Sun':
                    return messages.Sun;
                case 'Mon':
                    return messages.Mon;
                case 'Tue':
                    return messages.Tue;
                case 'Wed':
                    return messages.Wed;
                case 'Thu':
                    return messages.Thu;
                case 'Fri':
                    return messages.Fri;
                case 'Sat':
                    return messages.Sat;
                default:
                    return day; // Fallback
            }
        },
    };

    const MoverEnvetos = (data) => {
        const { start, end } = data;
        const updatedEventos = eventos.map((event) => {
          if (event.id === data.event.id) { // Certifique-se de usar o identificador correto
            return {
              ...event,
              start: new Date(start), // Atualizar o campo 'start'
              end: new Date(end)      // Atualizar o campo 'end'
            };
          }
          return event;
        });
        setEventos(updatedEventos); // Atualiza o estado com os eventos modificados
      };

    const handleEventOpen = (e) => {
        setEventoSelecionados(e);
        openModal()
    };
    
    const eventStyle = (e) => ({
        style: {
            backgroundColor: e.color,
        },
    });

    const handleEventClose = () => {
        setEventoSelecionados(null);
        openModal(false)
    };

  return (
    <div className='tela'>
            <div className="header-barra">
               <Header/>
            </div>
            <div className="container-calendario">
            <div className="toolbar">
                <p>Ferramentas</p>
            </div>
            <div className="calendario">
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView='agenda' //month
                    events={eventos}
                    localizer={localizer}  // Certifique-se de passar o localizer corretamente
                    resizable
                    className='calendar'
                    onEventDrop={MoverEnvetos}
                    onEventResize={MoverEnvetos}
                    onSelectEvent={handleEventOpen}
                    eventPropGetter={eventStyle}
                    messages={messages} 
                    formats={formats} // Traduções personalizadas
                    components={{
                        toolbar: CustomToolbar,
                    }}
                />
            </div>
            </div>
            {isModalOpen && eventoSelecionados && (
            <Modal
                nome={eventoSelecionados.title}
                aparelho={eventoSelecionados.desc}
                endereco={eventoSelecionados.endereco}
                idModal={eventoSelecionados.id}
                onClose={() => setIsModalOpen(false)} 
            />
        )}

        </div>
  )
}
const CustomToolbar = ({ label, onView, onNavigate, views }) => {
    const [itemText, setItemText] = useState('Mês');  // Alterado para português

    return (
        <div className="toolbar-container">
            <h1 className='mesAno'>{label}</h1>
            <div className="dirtop">
                <div className='dropdown'>
                    <button
                        type="button"
                        className="btn btn-secondary dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        id='dropdownMenuButton'
                        style={{width: '100px'}}
                    >
                        {itemText}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby='dropdownMenuButton'>
                        {views.map((view, index) => (
                            <div key={index}>
                                <li>
                                    <button className='dropdown-item' onClick={() => { 
                                        onView(view); 
                                        setItemText(view === 'month' ? 'Mês' : view === 'week' ? 'Semana' : view === 'day' ? 'Dia' : 'Agenda'); 
                                    }}>
                                        {view === 'month' ? 'Mês' : view === 'week' ? 'Semana' : view === 'day' ? 'Dia' : 'Agenda'}
                                    </button>
                                </li>
                                {index === 2 && <hr className='dropdown-divider'></hr>}
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="toolbar-navegation" style={{ marginLeft: '0px' }}>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('PREV')} style={{ marginLeft: '15px',marginTop:'18px' }}>
                        <i className="bi bi-caret-left"></i>
                    </button>
                    <button className='btn btn-secondary btn-1s mr-2 border-0' 
                    onClick={() => onNavigate('TODAY')} style={{width:'100px',height:'40px',marginTop:'18px'}}>Hoje</button>
                    <button className='btn btn-sm mr-2 text-secondary'
                     style={{marginTop:'15px'}}
                     onClick={() => onNavigate('NEXT')}>
                        <i className="bi bi-caret-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Calendario