import { Controller, Get, Query, Render } from '@nestjs/common';
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

  @Get("/search")
  @Render('search')
  getSearch(@Query("name") name: string) {
    if (!name) return { data: expenses, message: "" }

    const filtereltAdatok = expenses.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    if (filtereltAdatok.length == 0) { return { data: [], message: "Nincs találat" } }

    return {
      data: filtereltAdatok,
      message: ""
    }
  }

  @Get("/expensive")
  @Render('expensive')
  getExpensive(@Query("amount") amount: number) {
    const filtereltAdatok = expenses.filter(item => amount < item.amount);
    if (filtereltAdatok.length == 0) { return { data: [], message: "Nincs találat" } }

    return {
      data: filtereltAdatok,
      message: ""
    }
  }

  @Get("/stats")
  @Render('stats')
  getStats() {
    const kategoriak = ["food", "utilities", "entertainment", "misc"]

    let adatok: Object[] = [];
    kategoriak.forEach(name => {
      const filtereltAdatok = expenses.filter(item => item.category.toString() == name);
      const osszeg = filtereltAdatok.map(item => { return item.amount }).reduce((total, num) => total += num)
      const properties = {
        name: name,
        koltesekSzama: filtereltAdatok.length,
        osszeg: osszeg,
        atlag: osszeg / filtereltAdatok.length
      };

      adatok.push(properties);
    });

    return {
      koltesSzam: expenses.length,
      atlag: expenses.map(item => { return item.amount }).reduce((total, num) => total += num) / expenses.length,
      data: adatok

    }
  }
}
