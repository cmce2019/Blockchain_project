pragma solidity ^0.5.1;

contract Encuestas{ 
            mapping(string =>string) registroEncuesta;
            mapping(string => bool) registroRespuestas;
            
     function registrarEncuesta(string memory nombre, string memory preguntas) public{
            registroEncuesta[nombre] = preguntas; 
     }
     
     function getPreguntas(string memory nombre) public view returns (string memory preguntas){
         return registroEncuesta[nombre];
     } 
     
    function setRespuesta(string memory nombre,bool respuesta) public{
        registroRespuestas[nombre]=respuesta;
    }
    
    function getRespuesta(string memory nombre) public view returns (bool respuesta){
        return registroRespuestas[nombre];
    } 
 //¿Esta de acuerdo con el paro nacional?,¿Esta de acuerdo con el costo del pasaje de transmilenio?,¿Esta de acuerdo con el presidente actual?    
}