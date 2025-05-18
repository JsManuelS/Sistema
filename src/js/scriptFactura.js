document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const formTab = document.querySelector('[data-tab="form"]');
    const previewTab = document.querySelector('[data-tab="preview"]');
    const formContent = document.getElementById('form');
    const previewContent = document.getElementById('preview-tab');
    
    // Referencias a botones
    const addItemButton = document.getElementById('addItem');
    const addCuotaButton = document.getElementById('addCuota');
    const verPreviewButton = document.getElementById('verPreview');
    const actualizarButton = document.getElementById('actualizar');
    const limpiarButton = document.getElementById('limpiar');
    const volverButton = document.getElementById('volver');
    const downloadPDFButton = document.getElementById('downloadPDF');
    const downloadPDF2Button = document.getElementById('downloadPDF2');
    
    // Referencias a campos de crédito
    const creditoMontoInput = document.getElementById('creditoMonto');
    
    // Funciones para cambiar entre pestañas
    function cambiarTab(tabId) {
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-tab') === tabId) {
                tab.classList.add('active');
            }
        });
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabId === 'form' ? 'form' : 'preview-tab').classList.add('active');
    }
    
    // Agregar evento click a las pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            if (tabId === 'preview') {
                actualizarVistaPrevia();
            }
            cambiarTab(tabId);
        });
    });
    
    // Función para formatear fecha de YYYY-MM-DD a DD/MM/YYYY
    function formatearFecha(fecha) {
        if (!fecha) return '';
        const partes = fecha.split('-');
        if (partes.length !== 3) return fecha;
        return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    
    // Función para formatear número como moneda
    function formatearMoneda(valor) {
        if (!valor) return '0.00';
        return parseFloat(valor).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    
    // Función para convertir número a palabras
    function numeroALetras(numero) {
        const unidades = ['', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
        const especiales = ['', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
        const decenas = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
        const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
        
        if (numero === 0) return 'CERO';
        
        // Separar parte entera y decimal
        const partes = numero.toString().split('.');
        const entero = parseInt(partes[0]);
        const decimal = partes.length > 1 ? parseInt(partes[1]) : 0;
        
        let resultado = '';
        
        // Procesar miles
        if (entero >= 1000) {
            const miles = Math.floor(entero / 1000);
            if (miles === 1) {
                resultado += 'UN MIL ';
            } else {
                resultado += numeroALetrasMenorMil(miles) + ' MIL ';
            }
            resultado += numeroALetrasMenorMil(entero % 1000);
        } else {
            resultado += numeroALetrasMenorMil(entero);
        }
        
        // Añadir parte decimal
        resultado += ' Y ' + (decimal < 10 ? `0${decimal}` : decimal) + '/100';
        
        return resultado.trim();
    }
    
    // Función auxiliar para convertir números menores a 1000 a letras
    function numeroALetrasMenorMil(numero) {
        const unidades = ['', 'UN', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
        const especiales = ['DIEZ', 'ONCE', 'DOCE', 'TRECE', 'CATORCE', 'QUINCE', 'DIECISEIS', 'DIECISIETE', 'DIECIOCHO', 'DIECINUEVE'];
        const decenas = ['', 'DIEZ', 'VEINT', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
        const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];
        
        if (numero === 0) return '';
        if (numero === 100) return 'CIEN';
        
        let resultado = '';
        
        // Procesar centenas
        if (numero >= 100) {
            resultado += centenas[Math.floor(numero / 100)] + ' ';
            numero %= 100;
        }
        
        // Procesar decenas y unidades
        if (numero > 0) {
            if (numero < 10) {
                resultado += unidades[numero];
            } else if (numero < 20) {
                resultado += especiales[numero - 10];
            } else {
                const decena = Math.floor(numero / 10);
                const unidad = numero % 10;
                
                if (decena === 2) {
                    resultado += unidad === 0 ? 'VEINTE' : 'VEINTI' + unidades[unidad].toLowerCase();
                } else {
                    resultado += decenas[decena];
                    if (unidad > 0) {
                        resultado += ' Y ' + unidades[unidad];
                    }
                }
            }
        }
        
        return resultado.trim();
    }
    
    // Función para calcular los totales
    function calcularTotales() {
        // Obtener todos los ítems
        const itemRows = document.querySelectorAll('#itemsContainer .item-row');
        let subtotal = 0;
        let icbperTotal = 0;
        
        // Sumar valores de cada ítem
        itemRows.forEach(row => {
            const cantidad = parseFloat(row.querySelector('.item-cantidad').value) || 0;
            const valor = parseFloat(row.querySelector('.item-valor').value) || 0;
            const icbper = parseFloat(row.querySelector('.item-icbper').value) || 0;
            
            subtotal += cantidad * valor;
            icbperTotal += icbper;
        });
        
        // Calcular IGV (18%)
        const igv = subtotal * 0.18;
        const total = subtotal + igv + icbperTotal;
        
        // Calcular detracción
        const detraccionPorcentaje = parseFloat(document.getElementById('detraccionPorcentaje').value) || 0;
        const detraccionMonto = total * (detraccionPorcentaje / 100);
        
        // Calcular monto neto pendiente de pago
        // Este es el valor que necesitamos actualizar automáticamente
        const formaPago = document.getElementById('formaPago').value;
        const montoNetoPendiente = formaPago === 'Crédito' ? total - detraccionMonto : 0;
        
        return {
            subtotal: subtotal,
            valorVenta: subtotal,
            igv: igv,
            icbperTotal: icbperTotal,
            total: total,
            detraccionMonto: detraccionMonto,
            montoNetoPendiente: montoNetoPendiente
        };
    }
    
    // Función para actualizar montos de crédito
    function actualizarMontoCredito() {
        const totales = calcularTotales();
        
        // Actualizar campo de monto neto pendiente
        const creditoMontoInput = document.getElementById('creditoMonto');
        creditoMontoInput.value = totales.montoNetoPendiente.toFixed(2);
        
        // Actualizar monto de primera cuota (o única cuota)
        const cuotaRows = document.querySelectorAll('#cuotasContainer .item-row');
        if (cuotaRows.length > 0) {
            // Si solo hay una cuota, actualizamos su monto al total
            if (cuotaRows.length === 1) {
                cuotaRows[0].querySelector('.cuota-monto').value = totales.montoNetoPendiente.toFixed(2);
            } 
            // Si hay múltiples cuotas, podríamos distribuir proporcionalmente (opcional)
            // Por ahora solo actualizamos el total pendiente
        }
    }
    
    // Función para actualizar la vista previa
    function actualizarVistaPrevia() {
        // Actualizar datos del emisor
        document.getElementById('preview-emisorNombre').textContent = document.getElementById('emisorNombre').value;
        document.getElementById('preview-emisorRazon').textContent = document.getElementById('emisorRazon').value;
        document.getElementById('preview-emisorDireccion').textContent = document.getElementById('emisorDireccion').value;
        document.getElementById('preview-emisorUbicacion').textContent = document.getElementById('emisorUbicacion').value;
        document.getElementById('preview-emisorRUC').textContent = document.getElementById('emisorRUC').value;
        
        // Actualizar datos de la factura
        document.getElementById('preview-facturaNumero').textContent = document.getElementById('facturaNumero').value;
        document.getElementById('preview-formaPago').textContent = document.getElementById('formaPago').value;
        document.getElementById('preview-fechaEmision').textContent = formatearFecha(document.getElementById('fechaEmision').value);
        document.getElementById('preview-fechaVencimiento').textContent = formatearFecha(document.getElementById('fechaVencimiento').value);
        document.getElementById('preview-moneda').textContent = document.getElementById('moneda').value;
        
        // Actualizar datos del cliente
        document.getElementById('preview-clienteNombre').textContent = document.getElementById('clienteNombre').value;
        document.getElementById('preview-clienteRUC').textContent = document.getElementById('clienteRUC').value;
        document.getElementById('preview-clienteDireccionReceptor').textContent = document.getElementById('clienteDireccionReceptor').value;
        document.getElementById('preview-clienteDireccion').textContent = document.getElementById('clienteDireccion').value;
        
        // Actualizar detracción
        document.getElementById('preview-detraccionPorcentaje').textContent = document.getElementById('detraccionPorcentaje').value;
        
        // Actualizar items
        const itemsContainer = document.getElementById('preview-items');
        itemsContainer.innerHTML = '';
        
        document.querySelectorAll('#itemsContainer .item-row').forEach(row => {
            const cantidad = row.querySelector('.item-cantidad').value;
            const unidad = row.querySelector('.item-unidad').value;
            const codigo = row.querySelector('.item-codigo').value;
            const descripcion = row.querySelector('.item-descripcion').value;
            const valor = row.querySelector('.item-valor').value;
            const icbper = row.querySelector('.item-icbper').value;
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cantidad}</td>
                <td>${unidad}</td>
                <td>${codigo}</td>
                <td>${descripcion}</td>
                <td>${valor}</td>
                <td>${icbper}</td>
            `;
            itemsContainer.appendChild(tr);
        });
        
        // Actualizar cuotas de crédito
        document.getElementById('preview-creditoMonto').textContent = formatearMoneda(document.getElementById('creditoMonto').value);
        
        const cuotasContainer = document.getElementById('preview-cuotas');
        cuotasContainer.innerHTML = '';
        
        document.querySelectorAll('#cuotasContainer .item-row').forEach(row => {
            const numero = row.querySelector('.cuota-numero').value;
            const fecha = formatearFecha(row.querySelector('.cuota-fecha').value);
            const monto = formatearMoneda(row.querySelector('.cuota-monto').value);
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${numero}</td>
                <td>${fecha}</td>
                <td>S/ ${monto}</td>
            `;
            cuotasContainer.appendChild(tr);
        });
        
        // Actualizar nota al pie
        document.getElementById('preview-pieNota').textContent = document.getElementById('pieNota').value;
        
        // Calcular y actualizar totales
        const totales = calcularTotales();
        document.getElementById('preview-subtotal').textContent = formatearMoneda(totales.subtotal);
        document.getElementById('preview-valorVenta').textContent = formatearMoneda(totales.valorVenta);
        document.getElementById('preview-igv').textContent = formatearMoneda(totales.igv);
        document.getElementById('preview-icbperTotal').textContent = formatearMoneda(totales.icbperTotal);
        document.getElementById('preview-total').textContent = formatearMoneda(totales.total);
        document.getElementById('preview-detraccionMonto').textContent = formatearMoneda(totales.detraccionMonto);
        
        // Convertir total a letras
        document.getElementById('preview-montoLetras').textContent = numeroALetras(totales.total) + ' ' + document.getElementById('moneda').value;
    }
    
    // Función para agregar un nuevo ítem
    function agregarItem() {
        const itemsContainer = document.getElementById('itemsContainer');
        const newItem = document.createElement('div');
        newItem.className = 'item-row';
        newItem.innerHTML = `
            <input type="number" class="item-cantidad" placeholder="Cantidad" value="0.00" step="0.01">
            <input type="text" class="item-unidad" placeholder="Unidad" value="UNIDAD">
            <input type="text" class="item-codigo" placeholder="Código" value="">
            <input type="text" class="item-descripcion" placeholder="Descripción" value="">
            <input type="number" class="item-valor" placeholder="Valor" value="0.00" step="0.01">
            <input type="number" class="item-icbper" placeholder="ICBPER" value="0.00" step="0.01">
            <button type="button" class="remove-item">X</button>
        `;
        itemsContainer.appendChild(newItem);
        
        // Agregar evento para eliminar ítem
        newItem.querySelector('.remove-item').addEventListener('click', function() {
            itemsContainer.removeChild(newItem);
            // Actualizar montos de crédito cuando se elimina un ítem
            actualizarMontoCredito();
        });
        
        // Agregar eventos para actualizar automáticamente cuando cambien los valores
        const inputs = newItem.querySelectorAll('input[type="number"]');
        inputs.forEach(input => {
            input.addEventListener('input', actualizarMontoCredito);
        });
        
        // Actualizar montos de crédito cuando se agrega un ítem
        actualizarMontoCredito();
    }
    
    // Función para agregar una nueva cuota
    function agregarCuota() {
        const cuotasContainer = document.getElementById('cuotasContainer');
        const newCuota = document.createElement('div');
        newCuota.className = 'item-row';
        
        // Obtener el próximo número de cuota
        const cuotas = cuotasContainer.querySelectorAll('.item-row');
        const proximoNumero = cuotas.length + 1;
        
        // Obtener el monto neto pendiente y dividirlo por el número de cuotas
        const montoTotal = parseFloat(document.getElementById('creditoMonto').value) || 0;
        const montoPorCuota = (montoTotal / proximoNumero).toFixed(2);
        
        // Redistribuir el monto entre todas las cuotas
        cuotas.forEach(cuota => {
            cuota.querySelector('.cuota-monto').value = montoPorCuota;
        });
        
        newCuota.innerHTML = `
            <input type="number" class="cuota-numero" placeholder="Nº Cuota" value="${proximoNumero}" min="1">
            <input type="date" class="cuota-fecha" placeholder="Fecha Venc." value="${document.getElementById('fechaVencimiento').value}">
            <input type="number" class="cuota-monto" placeholder="Monto" value="${montoPorCuota}" step="0.01">
            <button type="button" class="remove-item">X</button>
        `;
        cuotasContainer.appendChild(newCuota);
        
        // Actualizar el campo de total de cuotas
        document.getElementById('creditoCuotas').value = proximoNumero;
        
        // Agregar evento para eliminar cuota
        newCuota.querySelector('.remove-item').addEventListener('click', function() {
            cuotasContainer.removeChild(newCuota);
            actualizarNumeroCuotas();
            redistribuirMontosCuotas();
        });
        
        // Agregar eventos para recalcular cuando se cambie el monto de una cuota
        newCuota.querySelector('.cuota-monto').addEventListener('input', function() {
            // Opcional: Aquí podríamos implementar una lógica para asegurarnos 
            // que la suma de todas las cuotas sea igual al monto total
        });
    }
    
    // Función para redistribuir montos en cuotas
    function redistribuirMontosCuotas() {
        const cuotas = document.querySelectorAll('#cuotasContainer .item-row');
        const montoTotal = parseFloat(document.getElementById('creditoMonto').value) || 0;
        
        if (cuotas.length > 0) {
            const montoPorCuota = (montoTotal / cuotas.length).toFixed(2);
            
            cuotas.forEach(cuota => {
                cuota.querySelector('.cuota-monto').value = montoPorCuota;
            });
        }
    }
    
    // Función para actualizar numeración de cuotas
    function actualizarNumeroCuotas() {
        const cuotas = document.querySelectorAll('#cuotasContainer .item-row');
        cuotas.forEach((cuota, index) => {
            cuota.querySelector('.cuota-numero').value = index + 1;
        });
        document.getElementById('creditoCuotas').value = cuotas.length;
    }
    
    // Función para generar PDF
    function generarPDF() {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Capturar la factura como imagen
        const factura = document.getElementById('factura');
        
        html2canvas(factura, {
            scale: 2, // Mejor calidad
            useCORS: true,
            logging: false
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1.0);
            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;
            
            // Añadir la imagen al PDF
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
            
            // Guardar el PDF
            pdf.save(`Factura_${document.getElementById('facturaNumero').value.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
        });
    }
    
    // Agregar eventos a los campos de entrada para actualizar automáticamente
    function configurarEventosActualizacionAutomatica() {
        // Para todos los campos de cantidad y valor en los ítems
        document.querySelectorAll('#itemsContainer .item-row').forEach(row => {
            const inputs = row.querySelectorAll('input[type="number"]');
            inputs.forEach(input => {
                input.addEventListener('input', actualizarMontoCredito);
            });
        });
        
        // Para el campo de detracción
        document.getElementById('detraccionPorcentaje').addEventListener('input', actualizarMontoCredito);
        
        // Para el campo de forma de pago
        document.getElementById('formaPago').addEventListener('change', actualizarMontoCredito);
    }
    
    // Agregar eventos a los botones
    if (addItemButton) {
        addItemButton.addEventListener('click', agregarItem);
    }
    
    if (addCuotaButton) {
        addCuotaButton.addEventListener('click', agregarCuota);
    }
    
    if (verPreviewButton) {
        verPreviewButton.addEventListener('click', function() {
            actualizarVistaPrevia();
            cambiarTab('preview');
        });
    }
    
    if (actualizarButton) {
        actualizarButton.addEventListener('click', function() {
            actualizarMontoCredito();
            actualizarVistaPrevia();
        });
    }
    
    if (limpiarButton) {
        limpiarButton.addEventListener('click', function() {
            // El botón tipo reset ya limpia el formulario automáticamente
            // Pero podríamos añadir una confirmación
            if (confirm('¿Está seguro de que desea limpiar todos los campos del formulario?')) {
                document.getElementById('facturaForm').reset();
                
                // Limpiar ítems excepto el primero
                const itemRows = document.querySelectorAll('#itemsContainer .item-row');
                for (let i = 1; i < itemRows.length; i++) {
                    itemRows[i].remove();
                }
                
                // Limpiar cuotas excepto la primera
                const cuotaRows = document.querySelectorAll('#cuotasContainer .item-row');
                for (let i = 1; i < cuotaRows.length; i++) {
                    cuotaRows[i].remove();
                }
                
                // Actualizar montos después de limpiar
                actualizarMontoCredito();
            }
        });
    }
    
    if (volverButton) {
        volverButton.addEventListener('click', function() {
            cambiarTab('form');
        });
    }
    
    if (downloadPDFButton) {
        downloadPDFButton.addEventListener('click', function() {
            actualizarVistaPrevia();
            generarPDF();
        });
    }
    
    if (downloadPDF2Button) {
        downloadPDF2Button.addEventListener('click', generarPDF);
    }
    
    // Agregar eventos para eliminar ítems iniciales
    document.querySelectorAll('#itemsContainer .remove-item').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.item-row').remove();
            actualizarMontoCredito();
        });
    });
    
    // Agregar eventos para eliminar cuotas iniciales
    document.querySelectorAll('#cuotasContainer .remove-item').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.item-row').remove();
            actualizarNumeroCuotas();
            redistribuirMontosCuotas();
        });
    });
    
    // Configurar eventos para actualización automática
    configurarEventosActualizacionAutomatica();
    
    // Inicializar la vista previa y el monto de crédito al cargar
    actualizarMontoCredito();
    actualizarVistaPrevia();
});