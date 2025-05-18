// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del formulario y vista previa
    const formElements = {
        // Información de empresa
        nombreEmpresa: document.getElementById('nombreEmpresa'),
        razonSocial: document.getElementById('razonSocial'),
        rucEmpresa: document.getElementById('rucEmpresa'),
        numeroGuia: document.getElementById('numeroGuia'),
        logoInput: document.getElementById('logoInput'),
        
        // Direcciones
        direccionFiscal: document.getElementById('direccionFiscal'),
        sucursal: document.getElementById('sucursal'),
        
        // Información de traslado
        fechaTraslado: document.getElementById('fechaTraslado'),
        destinatario: document.getElementById('destinatario'),
        rucDestinatario: document.getElementById('rucDestinatario'),
        puntoPartida: document.getElementById('puntoPartida'),
        puntoLlegada: document.getElementById('puntoLlegada'),
        
        // Motivos de traslado (checkboxes)
        venta: document.getElementById('venta'),
        ventaConfirmacion: document.getElementById('ventaConfirmacion'),
        compra: document.getElementById('compra'),
        trasladoEstablecimiento: document.getElementById('trasladoEstablecimiento'),
        importacion: document.getElementById('importacion'),
        trasladoEmisor: document.getElementById('trasladoEmisor'),
        exportacion: document.getElementById('exportacion'),
        trasladoZonaPrimaria: document.getElementById('trasladoZonaPrimaria'),
        otros: document.getElementById('otros'),
        
        // Transporte
        placaVehiculo: document.getElementById('placaVehiculo'),
        dniConductor: document.getElementById('dniConductor'),
        modalidadTransporte: document.getElementById('modalidadTransporte'),
        pesoTotal: document.getElementById('pesoTotal'),
        
        // Observaciones
        observaciones: document.getElementById('observaciones'),
        
        // Otros
        resolucion: document.getElementById('resolucion'),
        
        // Botones
        addRowBtn: document.getElementById('addRowBtn'),
        downloadBtn: document.getElementById('downloadBtn')
    };
    
    const previewElements = {
        // Información de empresa
        nombreEmpresaPreview: document.getElementById('nombreEmpresaPreview'),
        razonSocialPreview: document.getElementById('razonSocialPreview'),
        rucEmpresaPreview: document.getElementById('rucEmpresaPreview'),
        numeroGuiaPreview: document.getElementById('numeroGuiaPreview'),
        logoPreview: document.getElementById('logoPreview'),
        
        // Direcciones
        direccionFiscalPreview: document.getElementById('direccionFiscalPreview'),
        sucursalPreview: document.getElementById('sucursalPreview'),
        
        // Información de traslado
        fechaTrasladoPreview: document.getElementById('fechaTrasladoPreview'),
        destinatarioPreview: document.getElementById('destinatarioPreview'),
        rucDestinatarioPreview: document.getElementById('rucDestinatarioPreview'),
        puntoPartidaPreview: document.getElementById('puntoPartidaPreview'),
        puntoLlegadaPreview: document.getElementById('puntoLlegadaPreview'),
        
        // Motivos de traslado (checkboxes)
        ventaPreview: document.getElementById('ventaPreview'),
        ventaConfirmacionPreview: document.getElementById('ventaConfirmacionPreview'),
        compraPreview: document.getElementById('compraPreview'),
        trasladoEstablecimientoPreview: document.getElementById('trasladoEstablecimientoPreview'),
        importacionPreview: document.getElementById('importacionPreview'),
        trasladoEmisorPreview: document.getElementById('trasladoEmisorPreview'),
        exportacionPreview: document.getElementById('exportacionPreview'),
        trasladoZonaPrimariaPreview: document.getElementById('trasladoZonaPrimariaPreview'),
        otrosPreview: document.getElementById('otrosPreview'),
        
        // Transporte
        placaVehiculoPreview: document.getElementById('placaVehiculoPreview'),
        dniConductorPreview: document.getElementById('dniConductorPreview'),
        modalidadTransportePreview: document.getElementById('modalidadTransportePreview'),
        pesoTotalPreview: document.getElementById('pesoTotalPreview'),
        
        // Observaciones
        observacionesPreview: document.getElementById('observacionesPreview'),
        
        // Otros
        resolucionPreview: document.getElementById('resolucionPreview'),
        
        // Tabla de productos
        productTablePreview: document.getElementById('productTablePreview'),
    };
    
    // Función para actualizar la vista previa
    function updatePreview() {
        // Actualizar información de la empresa
        previewElements.nombreEmpresaPreview.textContent = formElements.nombreEmpresa.value;
        previewElements.razonSocialPreview.textContent = formElements.razonSocial.value;
        previewElements.rucEmpresaPreview.textContent = formElements.rucEmpresa.value;
        previewElements.numeroGuiaPreview.textContent = formElements.numeroGuia.value;
        
        // Actualizar direcciones
        previewElements.direccionFiscalPreview.textContent = formElements.direccionFiscal.value;
        previewElements.sucursalPreview.textContent = formElements.sucursal.value;
        
        // Actualizar información de traslado
        // Convertir formato de fecha de YYYY-MM-DD a DD/MM/YYYY
        if (formElements.fechaTraslado.value) {
            const dateParts = formElements.fechaTraslado.value.split('-');
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            previewElements.fechaTrasladoPreview.textContent = formattedDate;
        }
        
        previewElements.destinatarioPreview.textContent = formElements.destinatario.value;
        previewElements.rucDestinatarioPreview.textContent = formElements.rucDestinatario.value;
        previewElements.puntoPartidaPreview.textContent = formElements.puntoPartida.value;
        previewElements.puntoLlegadaPreview.textContent = formElements.puntoLlegada.value;
        
        // Actualizar motivos de traslado (checkboxes)
        previewElements.ventaPreview.innerHTML = formElements.venta.checked ? '☑ Venta' : '☐ Venta';
        previewElements.ventaConfirmacionPreview.innerHTML = formElements.ventaConfirmacion.checked ? '☑ Venta sujeta a confirmación del comprador' : '☐ Venta sujeta a confirmación del comprador';
        previewElements.compraPreview.innerHTML = formElements.compra.checked ? '☑ Compra' : '☐ Compra';
        previewElements.trasladoEstablecimientoPreview.innerHTML = formElements.trasladoEstablecimiento.checked ? '☑ Traslado entre establecimientos de la misma' : '☐ Traslado entre establecimientos de la misma';
        previewElements.importacionPreview.innerHTML = formElements.importacion.checked ? '☑ Importación' : '☐ Importación';
        previewElements.trasladoEmisorPreview.innerHTML = formElements.trasladoEmisor.checked ? '☑ Traslado emisor itinerante CP' : '☐ Traslado emisor itinerante CP';
        previewElements.exportacionPreview.innerHTML = formElements.exportacion.checked ? '☑ Exportación' : '☐ Exportación';
        previewElements.trasladoZonaPrimariaPreview.innerHTML = formElements.trasladoZonaPrimaria.checked ? '☑ Traslado a zona primaria' : '☐ Traslado a zona primaria';
        previewElements.otrosPreview.innerHTML = formElements.otros.checked ? '☑ Otros' : '☐ Otros';
        
        // Actualizar transporte
        previewElements.placaVehiculoPreview.textContent = formElements.placaVehiculo.value;
        previewElements.dniConductorPreview.textContent = formElements.dniConductor.value;
        previewElements.modalidadTransportePreview.textContent = formElements.modalidadTransporte.value;
        previewElements.pesoTotalPreview.textContent = formElements.pesoTotal.value;
        
        // Actualizar observaciones
        previewElements.observacionesPreview.textContent = formElements.observaciones.value;
        
        // Actualizar resolución
        previewElements.resolucionPreview.textContent = formElements.resolucion.value;
        
        // Actualizar tabla de productos
        updateProductTable();
    }
    
    // Función para actualizar la tabla de productos en la vista previa
    function updateProductTable() {
        const tbody = previewElements.productTablePreview.querySelector('tbody');
        tbody.innerHTML = '';
        
        // Obtener todas las filas de la tabla de productos del formulario
        const productRows = document.querySelectorAll('#productFormTable tbody tr');
        
        productRows.forEach((row, index) => {
            const code = row.querySelector('.productCode').value;
            const description = row.querySelector('.productDescription').value;
            const quantity = row.querySelector('.productQuantity').value;
            const unit = row.querySelector('.productUnit').value;
            
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${index + 1}</td>
                <td>${code}</td>
                <td>${description}</td>
                <td>${quantity}</td>
                <td>${unit}</td>
            `;
            
            tbody.appendChild(newRow);
        });
    }
    
    // Función para agregar una nueva fila a la tabla de productos
    function addProductRow() {
        const productTable = document.getElementById('productFormTable').querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="productCode" value=""></td>
            <td><input type="text" class="productDescription" value=""></td>
            <td><input type="number" class="productQuantity" value="1"></td>
            <td><input type="text" class="productUnit" value="UNIDAD"></td>
            <td><button class="removeProductBtn">X</button></td>
        `;
        
        // Agregar evento al botón de eliminar
        const removeBtn = newRow.querySelector('.removeProductBtn');
        removeBtn.addEventListener('click', function() {
            newRow.remove();
            updatePreview();
        });
        
        // Agregar eventos de cambio a los inputs
        const inputs = newRow.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', updatePreview);
        });
        
        productTable.appendChild(newRow);
        updatePreview();
    }
    
    // Función para manejar la carga del logo
    function handleLogoUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                previewElements.logoPreview.src = event.target.result;
                // Ocultar el texto de "TU LOGO AQUÍ"
                document.querySelector('.logo-text').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    }
    
    // Función para generar y descargar el PDF
    function generatePDF() {
        // Importar la librería jsPDF
        const { jsPDF } = window.jspdf;
        
        // Crear un elemento div temporal para clonar el guia de remisión
        const element = document.getElementById('guiaRemision');
        
        // Crear una instancia de html2canvas
        html2canvas(element, {
            scale: 2, // Aumentar la escala para mejor calidad
            useCORS: true, // Permitir imágenes de otros dominios
            logging: false, // Desactivar logs
            allowTaint: true // Permitir contenido de otros dominios
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            
            // Calcular dimensiones de la página A4
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Calcular el ratio de escalado para que quepa en una página A4
            const ratio = Math.min(pdfWidth / canvas.width, pdfHeight / canvas.height);
            const width = canvas.width * ratio;
            const height = canvas.height * ratio;
            
            // Centrar la imagen en la página
            const x = (pdfWidth - width) / 2;
            const y = (pdfHeight - height) / 2;
            
            // Agregar la imagen al PDF
            pdf.addImage(imgData, 'PNG', x, y, width, height);
            
            // Descargar el PDF
            pdf.save(`guia_remision_${formElements.numeroGuia.value.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
        });
    }
    
    // Agregar evento al primer botón de eliminar producto
    const firstRemoveBtn = document.querySelector('.removeProductBtn');
    if (firstRemoveBtn) {
        firstRemoveBtn.addEventListener('click', function(e) {
            // Solo eliminar si hay más de una fila
            const productRows = document.querySelectorAll('#productFormTable tbody tr');
            if (productRows.length > 1) {
                e.target.closest('tr').remove();
                updatePreview();
            }
        });
    }
    
    // Agregar eventos de cambio a todos los inputs del formulario
    for (const key in formElements) {
        const element = formElements[key];
        if (element && element !== formElements.addRowBtn && element !== formElements.downloadBtn && element !== formElements.logoInput) {
            if (element.type === 'checkbox') {
                element.addEventListener('change', updatePreview);
            } else {
                element.addEventListener('input', updatePreview);
            }
        }
    }
    
    // Agregar evento al botón de agregar fila
    formElements.addRowBtn.addEventListener('click', addProductRow);
    
    // Agregar evento al botón de descargar PDF
    formElements.downloadBtn.addEventListener('click', generatePDF);
    
    // Agregar evento para cargar logo
    formElements.logoInput.addEventListener('change', handleLogoUpload);
    
    // Ejecutar updatePreview inicialmente para llenar la vista previa
    updatePreview();
    
    // Establecer la fecha actual en el campo de fecha si está vacío
    if (!formElements.fechaTraslado.value) {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        formElements.fechaTraslado.value = `${year}-${month}-${day}`;
        updatePreview();
    }
});