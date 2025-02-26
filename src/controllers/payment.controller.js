import {z} from "zod";

const PaymentSchema = z.object({
    
    //nome: z.string().min(3, {message: "Nome deve ter no mínimo 3 caracteres"}),
    //email: z.string().email({message: "Email inválido"}),
    //senha: z.string().min(6, {message: "Senha deve ter no mínimo 6 caracteres"})
});
const PaymentController = {
    async createPayment(req, res) {
        try {
            const {nome, email, senha} = req.body;
            PaymentSchema.parse({nome, email, senha});
            console.log({nome, email, senha});
            res.status(201).json({ message: 'Payment created successfully' });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status (400).json ({ 
                    message: "Erro de validação",
                    errors: error.errors.map(
                        err => ({
                            atributo: err.path[0],
                            mensagem: err.message
                        })
                    )
                })
            }
            res.status(500).json({ message: error.message });            
        }
    }
}

export default PaymentController;