const fs = require("fs");

module.exports = class Contenedor {
  constructor(file) {
    this.file = file;
  }
  async getAll() {
    try {
      const check = await fs.promises.readFile(`${this.file}`, "utf-8");
      return JSON.parse(check);
    } catch (error) {
      console.log("El archivo está vacío");
      await fs.promises.writeFile(this.file, "");
      const check = await fs.promises.readFile(this.file, "utf-8");
      return check;
    }
  }
  async saveAll(productoingresado) {
    let arrayprevio = await this.getAll();
    let idPrevio = () => {
      if (arrayprevio.length > 0) {
        return arrayprevio.length;
      } else {
        arrayprevio = [];
        return 0;
      }
    };
    productoingresado.forEach((value, index) => {
      value.id = index + idPrevio() + 1;
    });
    arrayprevio.push(...productoingresado);

    try {
      await fs.promises.writeFile(
        `${this.file}`,
        JSON.stringify(arrayprevio, null, 2)
      );
      return console.log(`Nuevo item agregado con exito!`);
    } catch (error) {
      throw new Error("Error en el guardado");
    }
  }

  async getById(nro) {
    try {
      const check = await this.getAll();
      let validate = 0;
      check.forEach((element) => {
        if (element.id == nro) {
          validate++;
          console.log("Exito, producto encontrado");
          return element;
        }
      });
      if (validate == 0) {
        return "No existe el producto";
      }
    } catch {
      throw new Error("Error al obtener el Id");
    }
  }

  async getRandom() {
    try {
      const check = await this.getAll();
      let random = Math.floor(Math.random() * check.length);
      return check[random];
    } catch {
      throw new Error("Error al obtener productos aleatorios");
    }
  }

  async deleteById(nro) {
    try {
      const check = await this.getAll();
      check.forEach((element) => {
        if (nro == element.id) {
          check.splice(check.indexOf(element), 1);
        }
      });
      await fs.promises.writeFile(this.file, JSON.stringify(check, null, 2));
    } catch {
      throw new Error("Error en el borrado de Id");
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.file, ""); //JSON.stringify([], null, 2);
      console.log("Todos los productos fueron eliminados");
    } catch {
      throw new Error("No se pudieron borrar todos los objetos");
    }
  }

  async sellById(nro) {
    try {
      let check = await this.getAll();
      let validate = 0;
      check.forEach((element) => {
        if (nro == element.id) {
          element.stock--;
          validate++;
          console.log("El producto se vendio con exito");
          console.log("Quedan " + element.stock + " unidades");
        }
      });
      if (validate == 0) {
        console.log("No existe el producto o no hay stock");
      }
      await fs.promises.writeFile(this.file, JSON.stringify(check, null, 2));
    } catch {
      throw new Error("Error en la venta");
    }
  }
};
