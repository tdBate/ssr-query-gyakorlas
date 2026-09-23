import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Expense } from './expense.js';

const expenses: Expense[] = [
  {
    name: "Heti bevásárlás",
    amount: 32000,
    category: "food"
  },
  {
    name: "Villanyszámla",
    amount: 14500,
    category: "utilities"
  },
  {
    name: "Páros mozijegy és popcorn",
    amount: 8500,
    category: "entertainment"
  },
  {
    name: "Tisztítószerek és papíráru",
    amount: 6000,
    category: "misc"
  },
  {
    name: "Víz- és csatornadíj",
    amount: 9200,
    category: "utilities"
  },
  {
    name: "Kávézó a barátokkal",
    amount: 4800,
    category: "food"
  },
  {
    name: "Netflix és Spotify előfizetés",
    amount: 5500,
    category: "entertainment"
  },
  {
    name: "Gyógyszertári kiadások",
    amount: 7300,
    category: "misc"
  },
  {
    name: "Rendelt pizza",
    amount: 5200,
    category: "food"
  },
  {
    name: "Fűtés (Gázszámla)",
    amount: 21000,
    category: "utilities"
  }
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getIndex() {
    return {
      title: 'My First NestJS App'
    }
  }

  @Get("/all")
  @Render('all')
  getAll() {
    return {
      data: expenses,
    }
  }

  @Get("/top3")
  @Render('all')
  getTopThree() {
    return {
      data: expenses.sort((a, b) => b.amount - a.amount).slice(0, 3),
    }
  }
}
