import {BsFillHouseFill, BsBricks, BsBuildingFill, BsBarChartSteps, BsPersonFill } from 'react-icons/bs'

export const links = [
    {
        name: "Dashboard",
        path: '/dashboard',
        icon: <BsFillHouseFill />
    },
    {
        name: "Obras",
        path: '/obras',
        icon: <BsBricks />
    },
    {
        name: "Serviços",
        path: '/servicos',
        icon: <BsBuildingFill />
    },
    {
        name: "Etapas",
        path: '/etapas',
        icon: <BsBarChartSteps />
    },
    {
        name: "Usuários",
        path: '/usuarios',
        icon: <BsPersonFill />
    }
]