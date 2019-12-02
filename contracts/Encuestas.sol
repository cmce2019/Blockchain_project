pragma solidity ^0.5.1;

contract Encuestas{ 
            mapping(string =>string) registroEncuesta;
            mapping(string => string) registroRespuestas;
            mapping(string => int) numRespuestas;
     function registrarEncuesta(string memory nombre, string memory preguntas) public{
            registroEncuesta[nombre] = preguntas;
     }
     
     function getPreguntas(string memory nombre) public view returns (string memory preguntas){
         return registroEncuesta[nombre];
     } 
     
    function setRespuesta(string memory nombre,string memory respuesta) public{
        registroRespuestas[nombre]=respuesta;
          if (numRespuestas[nombre]==0){
              numRespuestas[nombre]=1;
          }else{
              numRespuestas[nombre]=++numRespuestas[nombre];
          }
    }
    
    function getRespuesta(string memory nombre) public view returns (string memory respuestas){
        return registroRespuestas[nombre];
    } 
    
        function getNumRespuestas(string memory nombre) public view returns (int respuestas){
        return  numRespuestas[nombre];
    }
 //¿Esta de acuerdo con el paro nacional?,¿Esta de acuerdo con el costo del pasaje de transmilenio?,¿Esta de acuerdo con el presidente actual?    
}