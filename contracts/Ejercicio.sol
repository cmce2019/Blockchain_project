pragma solidity ^0.5.0;
contract Ejercicio {
        struct Ubicacion_geografica {
        uint longitud;
        uint latitud;
        uint caudal;
    }
        struct Usuario{
            bool funcionario;
        }
    mapping (address => Usuario) usuarios;
    mapping (string => Ubicacion_geografica) ubicaciones;
    
    function setUbicacion_Geografica(address _address, uint longitud, uint latitud, uint caudal, string memory fecha) public {
        if (usuarios[_address].funcionario==true){
        ubicaciones[fecha].longitud=longitud;
        ubicaciones[fecha].latitud=latitud;
        ubicaciones[fecha].caudal=caudal;
        }
        else{
            revert();
        }
    }
    function registrarCiudadano (address _address) public{
        usuarios[_address].funcionario=false;
    }
     function registrarFuncionario (address _address) public{
        usuarios[_address].funcionario=true;
    }
    
     function getStatus(address _address) view public returns(bool){
         return (usuarios[_address].funcionario);
     }
    
    function getUbicacion_Geografica(string memory fecha) view public returns (uint,uint,uint){
                return (ubicaciones[fecha].longitud,ubicaciones[fecha].latitud, ubicaciones[fecha].caudal);
    }
    
    
}