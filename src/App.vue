<script setup>
  import { ref, onMounted, reactive, computed} from 'vue';
  import AlertaCotizar from './components/AlertaCotizar.vue';
  import Spinner from './components/Spinner.vue';

  import useCripto from './composables/useCripto';
  const { monedas, criptomonedas, cotizacion, spinner, obtenerCotizacion} = useCripto()

  const cotizar = reactive({
    moneda: '',
    criptomoneda: ''
  });

  const cotizarCripto = () => {
    //Valida cotizar, sí está vacío devuelva el alerta
    if(Object.values(cotizar).includes('')){
      error.value = 'Todos los campos son obligatorios'

      setTimeout(() => {
        error.value=''
      }, 3000);

      return;
      
    }
    
    obtenerCotizacion(cotizar);

  }

  const error = ref('');

  const mostrarResultado = computed(()=>{
    /* Comprobamos objeto vacio,
    si el objeto es mayor a 0 mostramos los resultados */
    return Object.values(cotizacion.value).length > 0
  });


</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span> Criptomonedas </span></h1>
  
    <div class="contenido">
      <AlertaCotizar
        v-if="error"
      >
      {{ error }}
      </AlertaCotizar>

      <form  
        class="formulario"
        v-on:submit.prevent="cotizarCripto"  
      >

        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select 
            id="moneda"
            v-model="cotizar.moneda"
          >
            <option value="">-- Selecciona -- </option>
              <option 
                v-for="moneda in monedas" 
                :value="moneda.codigo">
                  {{ moneda.texto }}
              </option>
          </select>
        </div>

        <div class="campo">
          <label for="cripto">Criptomoneda:</label>
          <select 
            id="cripto"
            v-model="cotizar.criptomoneda"
          >
            <option value="">-- Selecciona -- </option>
              <option 
                v-for="cripto in criptomonedas" 
                :value="cripto.CoinInfo.Name">

                  {{ cripto.CoinInfo.FullName }}

              </option>
          </select>
        </div>

        <input type="submit" value="Cotizar">

      </form>

      <Spinner
        v-if="spinner"
      />

      <div 
        class="contenedor-resultado"
        v-if="mostrarResultado">
        <h2>Cotización</h2>
          <div class="resultado">
            <img 
              :src="'https://cryptocompare.com/'+ cotizacion.IMAGEURL" 
              alt="imagen cripto">
            <div>
              <p>El precio es de: <span>{{ cotizacion.PRICE }}</span></p>
              <p>Precio más alto del día: <span>{{ cotizacion.HIGHDAY }}</span></p>
              <p>Precio más bajo del día: <span>{{ cotizacion.LOWDAY }}</span></p>
              <p>Variación ultimas 24hrs: <span>{{ cotizacion.CHANGEPCT24HOUR }}%</span></p>
              <p>Ultima actualización: <span class="green">{{ cotizacion.LASTUPDATE }}</span></p>
            </div>
          </div>
      </div>

    </div>
  </div>

</template>

<style scoped>
  .green{
    color: green;
  }
</style>
