async function menu() {
    try {
      const defaultMenu = {
        Vie: ["E1", "E2", "EG", "TLL"],
        Sab: ["C1", "C2", "CG"],
        Dom: ["Serie 1", "Serie 2", "Serie 3", "Final"]
      };
  
      console.log('Menú:', JSON.stringify(defaultMenu, null, 2));
  
      return defaultMenu;
    } catch (error) {
      console.error('Error al generar el menú:', error);
      throw error;
    }
  }
  
  module.exports = {
    menu
  };
  