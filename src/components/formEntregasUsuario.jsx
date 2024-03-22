import { useEffect, useState } from "react";
import apiUrl from "../config";
import { Form, FormSelect, FormControl, Button } from "react-bootstrap";
import axios from "axios";


const FormEntregasUsuario = ({ userId }) => {

  const [obras, setObras] = useState([]);
  const [blocos, setBlocos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [selectedObra, setSelectedObra] = useState('');
  const [selectedBloco, setSelectedBloco] = useState('');
  const [selectedServico, setSelectedServico] = useState('');
  const [selectedEtapa, setSelectedEtapa] = useState('')
  const [unidadeObra, setUnidadeObra] = useState('');
  const [formData, setFormData] = useState({
    refUsuario: '',
    refObra: '',
    blocoObra: '',
    servicoObra: '',
    unidadeObra: '',
    etapaEntregue: '',
  });

  const handleSubmit = async event => {
    

    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/entregaServico`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      alert(data.message);

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
    }
  };

  useEffect(() => {
    // Buscar lista de obras ao carregar o componente
    axios.get(`${apiUrl}/verObras`)
      .then(response => setObras(response.data.obras))
      .catch(error => console.error(error));
  }, []);

  const handleSelectedObra = (obraId) => {
    setSelectedObra(obraId);
    setSelectedBloco('');
    setSelectedServico('');
    setSelectedEtapa('');
    setUnidadeObra('');

    // Buscar blocos com base na obra selecionada
    if (obraId !== '') {
      axios.get(`${apiUrl}/numerosObra/${obraId}`)
        .then((response) => { setBlocos(response.data.numerosObra) })
        .catch(error => console.error(error));
        axios.get(`${apiUrl}/servicosPrestados/${obraId}`)
        .then((response) => { setServicos(response.data.getServicoPrestado) })
        .catch(error => console.error(error));

    }
  };

  const handleSelectedBloco = (blocoId) => {
    setSelectedBloco(blocoId);
    setSelectedServico('');
    setSelectedEtapa('');
    setUnidadeObra('');

  };

  const handleSelectedServico = (servicoId) => {
    setSelectedServico(servicoId);
    setSelectedEtapa('');
    setUnidadeObra('');

    // Buscar etapas com base no serviço selecionado
    if (servicoId !== '') {
      axios.get(`${apiUrl}/refEtapas/${servicoId}`)
        .then((response) => { setEtapas(response.data.etapas) })
        .catch(error => console.error(error));
    }
  };

  const handleSelectedEtapa = (etapaID) => {
    setSelectedEtapa(etapaID);
    setUnidadeObra('');
  }

  const handleUnidade = (unidade)=>{
    setUnidadeObra(unidade);
    setFormData({
      refUsuario: userId,
      refObra: selectedObra,
      blocoObra: selectedBloco,
      servicoObra: selectedServico,
      unidadeObra: unidadeObra,
      etapaEntregue: selectedEtapa,
    })
  }

  return (
    <Form className="row g-3" onSubmit={handleSubmit}>
      <FormSelect name="refObra" onChange={(e) => handleSelectedObra(e.target.value)} required>
        <option value={''}>Selecione uma obra</option>
        {obras.map(obra => (
          <option key={obra._id} value={obra._id}>{obra.nomeObra}</option>
        ))}
      </FormSelect>

      <FormSelect name="blocoObra" onChange={(e) => handleSelectedBloco(e.target.value)} required>
        <option value={''}>Selecione um bloco</option>
        {blocos.map(bloco => (
          <option key={bloco._id} value={bloco._id}>{bloco.numeroBloco}</option>
        ))}
      </FormSelect>

      <FormSelect name="servicoObra" onChange={(e) => handleSelectedServico(e.target.value)} required>
        <option value={''}>Selecione um serviço</option>
        {servicos.map(servico => (
          <option key={servico.servicoPrestado._id} value={servico.servicoPrestado._id}>{servico.servicoPrestado.nomeServico}</option>
        ))}
      </FormSelect>

      <FormSelect name="etapaEntregue" onChange={(e) => handleSelectedEtapa(e.target.value)} required>
        <option value={''}>Selecione uma etapa</option>
        {etapas.map(etapa => (
          <option key={etapa._id} value={etapa._id}>{etapa.nomeEtapa}</option>
        ))}
      </FormSelect>

      <FormControl name="unidadeObra" placeholder="Unidade" onChange={(e) => handleUnidade(e.target.value)} required/>

      <Button type="submit">Entregar</Button>
    </Form>
  )
}
export default FormEntregasUsuario;