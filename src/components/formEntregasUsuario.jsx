import { useEffect, useState } from "react";
import apiUrl from "../config";
import { Form, FormSelect, FormControl, Button } from "react-bootstrap";
import axios from "axios";


const FormEntregasUsuario = ({ userId, atualiza }) => {

  const [obras, setObras] = useState([]);
  const [blocos, setBlocos] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [etapas, setEtapas] = useState([]);
  const [formData, setFormData] = useState({
    refUsuario: userId,
    refObra: '',
    blocoObra: '',
    servicoObra: '',
    etapaEntregue: '',
    unidadeObra: '',
    percentual: '',
  });

  const [percentual, setPercentual] = useState(0);
  const [somaTempo, setSomaTempo] = useState(0);


  const handleSubmit = async event => {

    event.preventDefault();
    try {
      await fetch(`${apiUrl}/entregaServico`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (atualiza) {
        atualiza();
      }

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
    setFormData({
      ...formData,
      refObra: obraId,
    })

    // Buscar blocos com base na obra selecionada
    if (obraId !== '' && obras.length > 0) {
      axios.get(`${apiUrl}/numerosObra/${obraId}`)
        .then((response) => { setBlocos(response.data.numerosObra) })
        .catch(error => console.error(error));
      axios.get(`${apiUrl}/servicosPrestados/${obraId}`)
        .then((response) => { setServicos(response.data.getServicoPrestado) })
        .catch(error => console.error(error));
    }
  };

  const handleSelectedBloco = (blocoId) => {
    setFormData({
      ...formData,
      blocoObra: blocoId,
    })

  };

  const handleSelectedServico = (servicoId) => {
    setFormData({
      ...formData,
      servicoObra: servicoId,
    })

    // Buscar etapas com base no serviço selecionado
    if (servicoId !== '' && servicos.length > 0) {
      axios.get(`${apiUrl}/servicoPrestado/${servicoId}`)
        .then((response) => {
          const refEtapa = response.data.servico.servicoPrestado._id;
          axios.get(`${apiUrl}/refEtapas/${refEtapa}`)
            .then((response) => { setEtapas(response.data.etapas) })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));

    }
  };

  const handleSelectedEtapa = (etapaId) => {
    setFormData({
      ...formData,
      etapaEntregue: etapaId,
    })

    if (etapaId !== '') {
      axios.get(`${apiUrl}/refEtapa/${etapaId}`)
      .then((response) => {setPercentual(response.data.etapa.tempoExecucao)})
      .catch(error => console.error(error));
    }
  }

  const handleUnidade = (unidade) => {
    setFormData({
      ...formData,
      unidadeObra: unidade,
      percentual: somaTempo,
    })
  }

  useEffect(() => {
        
    const soma = etapas.reduce((acc, tempoItem) => acc + parseInt(tempoItem.tempoExecucao), 0)
    const percentuais = ((parseInt(percentual) * 100) / soma).toFixed(2);
    setSomaTempo(percentuais);
    
}, [etapas, percentual])

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
          <option key={servico._id} value={servico._id}>{servico.servicoPrestado.nomeServico}</option>
        ))}
      </FormSelect>

      <FormSelect name="etapaEntregue" onChange={(e) => handleSelectedEtapa(e.target.value)} required>
        <option value={''}>Selecione uma etapa</option>
        {etapas.map(etapa => (
          <option key={etapa._id} value={etapa._id}>{etapa.nomeEtapa}</option>
        ))}
      </FormSelect>

      <FormControl name="unidadeObra" placeholder="Unidade" onChange={(e) => handleUnidade(e.target.value)} required />

      <Button type="submit">Entregar</Button>
    </Form>
  )
}
export default FormEntregasUsuario;