const Url = require('../models/url');
const axios = require('axios');
const cron = require('node-cron');

/**
 * Inicia un cron global que llama todas las URLs activas cada minuto
 */
let globalCronStarted = false;
function startGlobalCron() {
  if (globalCronStarted) return; // evita iniciar más de una vez
  globalCronStarted = true;

  console.log('🕒 Iniciando cron global (cada 1 minuto)...');

  cron.schedule('* * * * *', async () => {
    console.log(`\n⏱️ [${new Date().toLocaleTimeString()}] Ejecutando ciclo global`);

    try {
      const urls = await Url.find({ active: true, cronEnabled: true });
      if (!urls.length) {
        console.log('⚠️ No hay URLs con cron activo.');
        return;
      }

      for (const u of urls) {
        try {
          const resCall = await axios.get(u.url);

          console.log('──────────────────────────────');
          console.log(`🌐 URL: ${u.url}`);
          console.log(`✅ Status: ${resCall.status}`);
          console.log('📦 Respuesta real:');

          if (typeof resCall.data === 'object') {
            console.log(JSON.stringify(resCall.data, null, 2));
          } else {
            console.log(resCall.data);
          }
          console.log('──────────────────────────────\n');

          await Url.findByIdAndUpdate(u._id, {
            lastStatus: resCall.status,
            lastResponse: resCall.data,
            lastExecutedAt: new Date()
          });
        } catch (err) {
          console.error(`❌ Error al llamar ${u.url}: ${err.message}`);
          await Url.findByIdAndUpdate(u._id, {
            lastStatus: err.response?.status || 500,
            lastResponse: { error: err.message },
            lastExecutedAt: new Date()
          });
        }
      }
    } catch (err) {
      console.error('❌ Error en cron global:', err.message);
    }
  });
}

/**
 * Crear una nueva URL
 */
exports.createUrl = async (req, res) => {
  try {
    const url = new Url(req.body);
    await url.save();
    res.status(201).json(url);
  } catch (err) {
    console.error('❌ Error al crear URL:', err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Listar todas las URLs
 */
exports.getUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    console.error('❌ Error al obtener URLs:', err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Actualizar una URL
 */
exports.updateUrl = async (req, res) => {
  try {
    const updated = await Url.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'URL no encontrada' });
    res.json(updated);
  } catch (err) {
    console.error('❌ Error al actualizar URL:', err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Eliminar una URL
 */
exports.deleteUrl = async (req, res) => {
  try {
    const deleted = await Url.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'URL no encontrada' });
    res.json({ message: 'URL eliminada correctamente' });
  } catch (err) {
    console.error('❌ Error al eliminar URL:', err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Llamar una URL manualmente (sin cron)
 */
exports.callUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL requerida' });

    const response = await axios.get(url);

    console.log('──────────────────────────────');
    console.log(`🚀 Llamada manual a ${url}`);
    console.log(`✅ Status: ${response.status}`);
    console.log('📦 Respuesta real:');
    if (typeof response.data === 'object') {
      console.log(JSON.stringify(response.data, null, 2));
    } else {
      console.log(response.data);
    }
    console.log('──────────────────────────────\n');

    res.json({
      status: response.status,
      data: response.data
    });
  } catch (err) {
    console.error('❌ Error al llamar URL manualmente:', err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Activar cron para una URL
 */
exports.enableCron = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findByIdAndUpdate(id, { cronEnabled: true }, { new: true });
    if (!url) return res.status(404).json({ error: 'URL no encontrada' });
    res.json({ message: 'Cron activado', url });
  } catch (err) {
    console.error('❌ Error al activar cron:', err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Desactivar cron para una URL
 */
exports.disableCron = async (req, res) => {
  try {
    const { id } = req.params;
    const url = await Url.findByIdAndUpdate(id, { cronEnabled: false }, { new: true });
    if (!url) return res.status(404).json({ error: 'URL no encontrada' });
    res.json({ message: 'Cron desactivado', url });
  } catch (err) {
    console.error('❌ Error al desactivar cron:', err.message);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Iniciar el cron global (solo una vez, al arrancar el servidor)
 */
exports.startGlobalCron = startGlobalCron;
