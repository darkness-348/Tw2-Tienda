using System;
using System.Collections.Generic;
using System.Text;
using Tienda.Domain.Entitys;

namespace Tienda.Application.Dtos
{
    public class VentaDTO
    {
        //para obtener el id del usuario(cajero) se tendria que obtener el jwt de ese usuario y buscarlo    
          
        public decimal Total { get; set; }
        public EstadoVenta Estado { get; set; }
        public string Descripcion { get; set; } // boleto/factura

    }
    
}
