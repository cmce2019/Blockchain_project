pragma solidity ^0.5.1;

contract Estaciones{
    
    struct Vehiculo{
        bool existe;
        address direccion;
            uint256 saldo;
        }
        
    struct Estacion{
           bool existe;
            address direccion;
            string nombre;
            string nombreGasolina;
            uint precioPorGalon;
        }
        
      mapping (address => Vehiculo) Vehiculos;
      mapping (address => Estacion) Estaciones;
      mapping (address => uint) saldoEstacion;

    function consignar(address direccion) public payable{
        if(Vehiculos[direccion].existe){
            Vehiculos[direccion].saldo+=msg.value;
}
 else{
               revert();
           }
    }


     function registrarVehiculo(address direccion ) public payable{
                if(!Vehiculos[direccion].existe){
            Vehiculo memory vehiculo = Vehiculo(true,direccion,msg.value);
            Vehiculos[direccion] = vehiculo ;  //se registra un Vehiculo
                }else{
                    consignar(direccion);
                }
        }
    
     function registrarEstacion(string memory nombre,address direccion) public{
            Estaciones[direccion].existe=true;
            Estaciones[direccion].nombre = nombre;
            Estaciones[direccion].direccion = direccion;
        }
    //setGasInfo
      function registrarTipoDeGasolina(string memory nombre, uint precio,address direccion) public{
            if(Estaciones[direccion].existe){
         Estaciones[direccion].nombreGasolina=nombre;
         Estaciones[direccion].precioPorGalon=precio; 
         saldoEstacion[direccion]=0;
            }
             else{
               revert();
           }
        
      }
        //getGasInfo
       function obtenerTipoDeGasolina(address direccion) public view returns (string memory nombreGasolina, uint precio){
           if(Estaciones[direccion].existe){
        return(Estaciones[direccion].nombreGasolina, Estaciones[direccion].precioPorGalon);
       }
           else{
               revert();
           }
       }
       
       function getSaldoV(address vehiculo)public view returns (uint saldo){
             if(Vehiculos[vehiculo].existe){
    return(Vehiculos[vehiculo].saldo);
             }else{
                 revert();
             }
}
function getSaldoG(address estacion)public view returns (uint saldo){
      if(Estaciones[estacion].existe){
    return(saldoEstacion[estacion]);
      }
      else{
          revert();
      }
}
       
          
function cargarGas(address payable estacion, address payable vehiculo, uint galones)public payable{
                if(Vehiculos[vehiculo].existe && Estaciones[estacion].existe){
              Vehiculos[vehiculo].saldo-=Estaciones[estacion].precioPorGalon*galones;
             estacion.transfer(Estaciones[estacion].precioPorGalon*galones);
              saldoEstacion[estacion]+=Estaciones[estacion].precioPorGalon*galones;
                }else{
                    revert();
                }
         
         
        }

  function solicitardevolucion(address payable vehiculo) public payable{
      if (Vehiculos[vehiculo].existe){
      address payable ad=address(uint160(Vehiculos[vehiculo].direccion));
        ad.transfer(Vehiculos[vehiculo].saldo);
        }else{
            revert();
        }
      
  }

        

}