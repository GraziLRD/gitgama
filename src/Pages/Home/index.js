import React, { useState } from "react";
import axios from 'axios';
import * as S from './styled';
import { useHistory } from 'react-router-dom';
import gitcat from '../../assets/gitcat.png';

function App(props) {
  const history = useHistory();
  const [usuario, setUsuario] = useState('');
  const [erro, setError] = useState(false);

  function handlePesquisa() {
    axios.get(`https://api.github.com/users/${usuario}/repos`)
    .then(response => {
      const repositories = response.data;
      const repositoriesName = [];
      repositories.map((repository) => {
        repositoriesName.push(repository.name);
      });
      localStorage.setItem('repositoriesName', JSON.stringify(repositoriesName));
      setError(false);
      history.push('/repositories');
    })
    .catch(err => {
      setError(true);
    });
  }

  return (
    <S.HomeContainer>
      <S.Imagem src={gitcat} alt="gitcat" />
      <S.Title>Busca de repositórios a partir de usuário GitHub</S.Title>
      <S.Content>
        <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
        <S.Button type="button" onClick={handlePesquisa} >Pesquisar</S.Button>
      </S.Content>
      { erro ? <S.ErrorMsg>Ocorreu um erro. Tente novamente.</S.ErrorMsg> : '' }
    </S.HomeContainer>
  );
}

export default App;