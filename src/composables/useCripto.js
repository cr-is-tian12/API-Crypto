import { ref, onMounted } from 'vue';
import config from '../../config.example';

export default function useCripto(){

    //*Moviendo de APP hacia nuestro composable (useCripto)
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
        { codigo: 'CLP', texto: 'Peso Chileno'},
    ])
    const criptomonedas = ref([]);  

    onMounted(() => {
        const url = 'Your_API';

        fetch(url)
        .then(respuesta => respuesta.json())
        .then( data => {
            // console.log(data.Data);
            criptomonedas.value = data.Data;
        });
    })
    
    const cotizacion = ref({});

    const spinner = ref(false);

      
  const obtenerCotizacion = async (cotizar) => {

    spinner.value = true
    cotizacion.value = {}

    try {
      const { moneda, criptomoneda } = cotizar;
      const url = ``
      
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data.DISPLAY[criptomoneda][moneda]);
      cotizacion.value = data.DISPLAY[criptomoneda][moneda];
    } catch (error) {
      console.log(error);
    } finally{
      spinner.value = false;
    }

  };

    return {
        monedas,
        criptomonedas,
        cotizacion,
        spinner,
        obtenerCotizacion
    };
}

