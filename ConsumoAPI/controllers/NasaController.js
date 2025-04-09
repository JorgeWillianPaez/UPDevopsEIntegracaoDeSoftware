class NasaController {

    constructor(axios) {
        this.axios = axios;
        this.nasa = "http://localhost:4000/novaapi";
    }

    async accessData(req, res) {
        const response = await this.axios.get(
            this.nasa,
            {
                params: {
                    id: req.query.id
                }
            }
        );

        res.json(this.tractResponseData(response));
    }

		tractResponseData(response) {
			return {
				nome: response.data.name
			}
		}
}

module.exports = NasaController;