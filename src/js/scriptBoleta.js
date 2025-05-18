
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const addItemBtn = document.getElementById('add-item');
    const itemsTable = document.getElementById('items-tbody');
    const updatePreviewBtn = document.getElementById('update-preview');
    const downloadPdfBtn = document.getElementById('download-pdf');
    
    // Inicialización
    inicializarFormulario();
    actualizarVistaPrevia();
    
    
    // Event Listeners
    addItemBtn.addEventListener('click', agregarItem);
    updatePreviewBtn.addEventListener('click', actualizarVistaPrevia);
    downloadPdfBtn.addEventListener('click', descargarPDF);
    
    // Añadir primer ítem por defecto
    agregarItemConDatos({
        cantidad: "1.00",
        unidad: "UNIDAD",
        codigo: "SERV01",
        descripcion: "SERVICIO DE LLENADO DE GUÍA PAGOS VARIOS",
        valor: "100.00",
        descuento: "0.00"
    });
    
    /**
     * Inicializa el formulario con los valores por defecto
     */
    function inicializarFormulario() {
        // Establecer fecha de vencimiento (por ejemplo, 30 días después de emisión)
        const fechaEmision = document.getElementById('fecha-emision').value;
        if (fechaEmision) {
            document.getElementById('fecha-vencimiento-input').value = calcularFechaVencimiento(fechaEmision, 30);
        }
        
        // Escuchar cambios en los campos para actualizar automáticamente
        const camposTexto = document.querySelectorAll('.edit-panel input[type="text"], .edit-panel input[type="number"]');
        camposTexto.forEach(campo => {
            campo.addEventListener('change', actualizarCampoEspecifico);
        });
    }
    
    /**
     * Actualiza campos específicos cuando cambian
     */
    function actualizarCampoEspecifico(event) {
        const campo = event.target;
        const id = campo.id;
        const valor = campo.value;
        
        // Actualizar el campo correspondiente en la vista previa
        if (id && document.getElementById('preview-' + id)) {
            document.getElementById('preview-' + id).textContent = valor;
        }
        
        // Si es un campo que afecta los totales, recalcular
        if (id === 'otros-cargos' || id === 'otros-tributos' || 
            campo.classList.contains('item-cantidad') || 
            campo.classList.contains('item-valor') || 
            campo.classList.contains('item-descuento')) {
            calcularTotales();
        }
    }
    
    /**
     * Agrega un nuevo ítem vacío a la tabla
     */
    function agregarItem() {
        const template = document.getElementById('item-template');
        const clone = document.importNode(template.content, true);
        
        // Añadir event listeners a los botones y campos
        const deleteBtn = clone.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', eliminarItem);
        
        const campos = clone.querySelectorAll('input');
        campos.forEach(campo => {
            campo.addEventListener('change', actualizarVistaPrevia);
        });
        
        itemsTable.appendChild(clone);
    }
    
    /**
     * Agrega un ítem con datos preestablecidos
     */
    function agregarItemConDatos(datos) {
        const template = document.getElementById('item-template');
        const clone = document.importNode(template.content, true);
        
        // Establecer valores
        clone.querySelector('.item-cantidad').value = datos.cantidad;
        clone.querySelector('.item-unidad').value = datos.unidad;
        clone.querySelector('.item-codigo').value = datos.codigo;
        clone.querySelector('.item-descripcion').value = datos.descripcion;
        clone.querySelector('.item-valor').value = datos.valor;
        clone.querySelector('.item-descuento').value = datos.descuento;
        
        // Añadir event listeners
        const deleteBtn = clone.querySelector('.btn-delete');
        deleteBtn.addEventListener('click', eliminarItem);
        
        const campos = clone.querySelectorAll('input');
        campos.forEach(campo => {
            campo.addEventListener('change', actualizarVistaPrevia);
        });
        
        itemsTable.appendChild(clone);
        actualizarVistaPrevia();
    }
    
    /**
     * Elimina un ítem de la tabla
     */
    function eliminarItem(event) {
        const fila = event.target.closest('tr');
        fila.remove();
        actualizarVistaPrevia();
    }
    
    /**
     * Actualiza todos los elementos de la vista previa según los valores del formulario
     */
    function actualizarVistaPrevia() {
        // Actualizar datos de la empresa
        document.getElementById('preview-empresa').textContent = document.getElementById('empresa').value;
        document.getElementById('preview-direccion').textContent = document.getElementById('direccion').value;
        document.getElementById('preview-ubicacion').textContent = document.getElementById('ubicacion').value;
        document.getElementById('preview-ruc').textContent = document.getElementById('ruc').value;
        document.getElementById('preview-num-boleta').textContent = document.getElementById('num-boleta').value;
        
        // Actualizar datos del cliente
        document.getElementById('preview-fecha-emision').textContent = document.getElementById('fecha-emision').value;
        document.getElementById('preview-fecha-vencimiento').textContent = document.getElementById('fecha-vencimiento-input').value;
        document.getElementById('preview-cliente').textContent = document.getElementById('cliente').value;
        document.getElementById('preview-dni').textContent = document.getElementById('dni').value;
        document.getElementById('preview-moneda').textContent = document.getElementById('moneda').value;
        document.getElementById('preview-observacion').textContent = document.getElementById('observacion').value;
        
        // Actualizar otros valores
        document.getElementById('preview-otros-cargos').textContent = formatearNumero(document.getElementById('otros-cargos').value);
        document.getElementById('preview-otros-tributos').textContent = formatearNumero(document.getElementById('otros-tributos').value);
        
        // Actualizar ítems
        actualizarTablaItems();
        
        // Calcular totales
        calcularTotales();
    }
    
    /**
     * Actualiza la tabla de ítems en la vista previa
     */
    function actualizarTablaItems() {
        const previewItems = document.getElementById('preview-items');
        previewItems.innerHTML = '';
        
        // Obtener todos los ítems del formulario
        const itemsRows = document.querySelectorAll('#items-tbody .item-row');
        
        itemsRows.forEach(row => {
            const cantidad = row.querySelector('.item-cantidad').value;
            const unidad = row.querySelector('.item-unidad').value;
            const codigo = row.querySelector('.item-codigo').value;
            const descripcion = row.querySelector('.item-descripcion').value;
            const valor = row.querySelector('.item-valor').value;
            const descuento = row.querySelector('.item-descuento').value;
            
            // Calcular importe
            const valorNum = parseFloat(valor) || 0;
            const descuentoNum = parseFloat(descuento) || 0;
            const cantidadNum = parseFloat(cantidad) || 0;
            const importe = (valorNum * cantidadNum) - descuentoNum;
            
            // Crear fila para la vista previa
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${formatearNumero(cantidad)}</td>
                <td>${unidad}</td>
                <td>${codigo}</td>
                <td>${descripcion}</td>
                <td>${formatearNumero(valor)}</td>
                <td>${formatearNumero(descuento)}</td>
                <td>${formatearNumero(importe.toFixed(2))}</td>
            `;
            
            previewItems.appendChild(tr);
        });
    }
    
    /**
     * Calcula los totales de la boleta
     */
    function calcularTotales() {
        let total = 0;
        
        // Sumar importes de todos los ítems
        const itemsRows = document.querySelectorAll('#items-tbody .item-row');
        itemsRows.forEach(row => {
            const cantidad = parseFloat(row.querySelector('.item-cantidad').value) || 0;
            const valor = parseFloat(row.querySelector('.item-valor').value) || 0;
            const descuento = parseFloat(row.querySelector('.item-descuento').value) || 0;
            
            const importe = (valor * cantidad) - descuento;
            total += importe;
        });
        
        // Añadir otros cargos y tributos
        const otrosCargos = parseFloat(document.getElementById('otros-cargos').value) || 0;
        const otrosTributos = parseFloat(document.getElementById('otros-tributos').value) || 0;
        
        total += otrosCargos + otrosTributos;
        
        // Actualizar total en la vista previa
        document.getElementById('preview-total').textContent = `S/. ${formatearNumero(total.toFixed(2))}`;
    }
    
    /**
     * Genera y descarga el PDF de la boleta
     */
    function descargarPDF() {
        // Obtener el contenedor de la boleta
        const elemento = document.getElementById('pdf-content');
        
        // Crear un clon del elemento para no afectar la visualización actual
        const clonedElement = elemento.cloneNode(true);
        
        // Crear un contenedor temporal fuera del flujo normal del documento
        const tempContainer = document.createElement('div');
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.style.top = '-9999px';
        tempContainer.style.width = '210mm'; // Ancho A4
        tempContainer.style.padding = '0';
        tempContainer.style.margin = '0';
        tempContainer.style.backgroundColor = 'white';
        tempContainer.style.zIndex = '-1';
        tempContainer.appendChild(clonedElement);
        document.body.appendChild(tempContainer);
        
        // Aplicar estilos especiales al clon para la captura
        clonedElement.style.width = '100%';
        clonedElement.style.padding = '10mm';
        clonedElement.style.margin = '0';
        clonedElement.style.boxShadow = 'none';
        clonedElement.style.border = 'none';
        clonedElement.style.overflow = 'visible';
        
        // Notificar al usuario
        alert('Preparando la descarga del PDF...');
        
        // Opciones mejoradas para html2pdf
        const opciones = {
            margin: [5, 0, 5, 0], // [arriba, izquierda, abajo, derecha] en mm
            filename: 'boleta-electronica.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { 
                scale: 2, // Mayor escala para mejor calidad
                useCORS: true,
                logging: false,
                letterRendering: true,
                allowTaint: true,
                scrollX: 0,
                scrollY: 0
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: 'portrait',
                compress: true,
                hotfixes: ['px_scaling']
            },
            pagebreak: { mode: 'avoid-all' }
        };
        
        // Dar tiempo al navegador para procesar el DOM antes de generar el PDF
        setTimeout(() => {
            // Generar PDF con manejo mejorado de errores
            html2pdf()
                .set(opciones)
                .from(clonedElement)
                .save()
                .then(() => {
                    console.log('PDF generado con éxito');
                    // Eliminar el contenedor temporal
                    document.body.removeChild(tempContainer);
                })
                .catch(error => {
                    console.error('Error al generar el PDF:', error);
                    alert('Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.');
                    // Eliminar el contenedor temporal en caso de error
                    document.body.removeChild(tempContainer);
                });
        }, 100);
    }
    
    /**
     * Calcula la fecha de vencimiento a partir de una fecha de emisión
     */
    function calcularFechaVencimiento(fechaStr, dias) {
        const [dia, mes, anio] = fechaStr.split('/').map(Number);
        const fecha = new Date(anio, mes - 1, dia);
        fecha.setDate(fecha.getDate() + dias);
        
        const nuevoDia = String(fecha.getDate()).padStart(2, '0');
        const nuevoMes = String(fecha.getMonth() + 1).padStart(2, '0');
        const nuevoAnio = fecha.getFullYear();
        
        return `${nuevoDia}/${nuevoMes}/${nuevoAnio}`;
    }
    
    /**
     * Formatea un número para mostrarlo con dos decimales
     */
    function formatearNumero(numero) {
        return parseFloat(numero).toFixed(2);
    }
});

