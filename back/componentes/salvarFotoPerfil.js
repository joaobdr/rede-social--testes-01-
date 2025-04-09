// Configuração do multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'assets/imgs/public'); // Diretório onde o arquivo será salvo
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Definindo o nome do arquivo
  },
});

const upload = multer({ storage: storage });


app.post('/api/uploadperfil', (req, res, next) => {
  // const { usuario, senha } = req.body;
  console.log(req.body);
  
  // Se a autenticação for bem-sucedida, passar para o próximo middleware (upload de arquivo)
  next();
}, upload.single('file'), (req, res) => {
  // Se o arquivo foi enviado
  if (req.file) {
    return res.status(200).json({ message: 'Imagem enviada com sucesso', file: req.file });
  } else {
    return res.status(400).json({ error: 'Nenhuma imagem foi enviada' });
  }
});