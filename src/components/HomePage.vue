<template>
  <div class="form-wrapper">
    <h1>Encontre o PetShop com os melhores preços na sua região!</h1>
    <form @submit.prevent="submitForm">
      <label for="date">Data:</label>
      <input id="date" v-model="form.date" type="date">

      <label for="smallDogs">Cães pequenos:</label>
      <input id="smallDogs" v-model.number="form.smallDogs" type="number" min="0">

      <label for="bigDogs">Cães grandes:</label>
      <input id="bigDogs" v-model.number="form.bigDogs" type="number" min="0">

      <button type="submit" :disabled="!isFormValid">Encontrar Petshop</button>
    </form>

    <div v-if="bestPetshop" class="resultado">
      <h2>Petshop mais barato: {{ bestPetshop.name }}</h2>
      <p>Preço total: R$ {{ bestPetshop.totalPrice }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
      date: '',
      smallDogs: 0,
      bigDogs: 0,
    },
    bestPetshop: null,
    meuCaninoFeliz: {
        name: 'Meu Canino Feliz',
        distance: 2,
        weekdaySmallPrice: 20,
        weekdayBigPrice: 40,
        weekendSmallPrice: 20 * 1.2,
        weekendBigPrice: 40 * 1.2
    },
    vaiRex: {
        name: 'Vai Rex',
        distance: 1.7,
        weekdaySmallPrice: 15,
        weekdayBigPrice: 50,
        weekendSmallPrice: 20,
        weekendBigPrice: 55
    },
    chowChawgas: {
        name: 'ChowChawgas',
        distance: 0.8,
        weekdaySmallPrice: 30,
        weekdayBigPrice: 45,
        weekendSmallPrice: 30,
        weekendBigPrice: 45
    },
    };
  },
  computed: {
    isFormValid() {
      return this.form.date !== '' && (this.form.smallDogs > 0 || this.form.bigDogs > 0);
    }
  },
  methods: {
    calculateTotalPrice(petshop, date, smallDogs, bigDogs) {
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 5 || dayOfWeek === 6;
      const totalPrice = (smallDogs * (isWeekend ? petshop.weekendSmallPrice : petshop.weekdaySmallPrice)) + (bigDogs * (isWeekend ? petshop.weekendBigPrice : petshop.weekdayBigPrice));
      return totalPrice;
    },
    findBestPetshop(petshops, date, smallDogs, bigDogs) {
      const currentDate = new Date(date);
      const totalPrices = petshops.map(petshop => ({
        petshop,
        price: this.calculateTotalPrice(petshop, currentDate, smallDogs, bigDogs)
      }));
      totalPrices.sort((a, b) => {
        if (a.price === b.price) {
          return a.petshop.distance - b.petshop.distance;
        }
        return a.price - b.price;
      });
      this.bestPetshop = totalPrices[0].petshop;
      this.bestPetshop.totalPrice = totalPrices[0].price;
    },
    submitForm() {
        this.findBestPetshop([this.meuCaninoFeliz, this.vaiRex, this.chowChawgas], new Date(this.form.date), this.form.smallDogs, this.form.bigDogs);
        console.log(this.meuCaninoFeliz.weekendSmallPrice);
      }
    },
};
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #f8f4e5;
}

.form-wrapper h1 {
  margin: 2rem;
  text-align: center;
  color: rgba(0,0,0,1);
}

input {
  display: block;
  width: 100%;
  font-size: 1.5rem;
  line-height: 1rem;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 5px solid rgba(0,0,0,1);
  background: #f8f4e5;
  min-width: 250px;
  padding: 5px 0 0 5px;
  outline: none;
  color: rgba(0,0,0,1);
}
  
input:focus {
  border-bottom: 5px solid #ffa580;
}
  
button {
  display: block;
  margin: 20px auto 20px auto;
  line-height: 2rem;
  font-size: 1.2rem;
  padding: 5px 20px;
  background: #ffa580;
  letter-spacing: 2px;
  transition: .2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0,0,0,1);
  box-shadow: 6px 6px 1px 1px #95a4ff, 6px 6px 1px 2px rgba(0,0,0,1);
  cursor: pointer;
}

button:disabled {
  background-color: #d4d4d4;
}

button:hover {
  background: #f59773;
  box-shadow: 6px 6px 1px 1px #8f9efc, 6px 6px 1px 2px rgba(0,0,0,1);
}

button:disabled:hover {
  background-color: #d4d4d4;
  cursor: not-allowed;
}
  
  
button::selection {
  background: #ffc8ff;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
  border-bottom: 5px solid #95a4ff;
  -webkit-text-fill-color: #2A293E;
  -webkit-box-shadow: 0 0 0px 1000px #f8f4e5 inset;
  transition: background-color 5000s ease-in-out 0s;
}
  
</style>
