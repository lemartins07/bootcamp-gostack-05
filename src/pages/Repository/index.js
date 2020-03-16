import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';
import api from '../../services/api';
import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  IssueFilter,
  IssuePagination,
} from './styles';

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      issuesFilter: ['all', 'open', 'closed'],
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleFilter = async e => {
    const { match } = this.props;
    const state = e.target.innerHTML;
    const repoName = decodeURIComponent(match.params.repository);

    this.setState({
      loading: true,
    });

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state,
        per_page: 5,
      },
    });

    this.setState({
      issues: response.data,
      loading: false,
    });
  };

  handlePreviousPage = async e => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { page } = this.state;

    if (page === 1) {
      return;
    }

    this.setState({
      loading: true,
    });

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        page: page - 1,
      },
    });

    this.setState({
      issues: response.data,
      loading: false,
      page: page - 1,
    });
  };

  handleNextPage = async e => {
    const { match } = this.props;
    const repoName = decodeURIComponent(match.params.repository);
    const { page } = this.state;

    this.setState({
      loading: true,
    });

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        per_page: 5,
        page: page + 1,
      },
    });

    this.setState({
      issues: response.data,
      loading: false,
      page: page + 1,
    });
  };

  render() {
    const { repository, issues, issuesFilter, loading, page } = this.state;

    if (loading) {
      return (
        <Loading loading={loading}>
          <FaSpinner color="#FFF" size={50} />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueFilter>
          {issuesFilter.map(filter => (
            <li key={filter}>
              <button type="button" onClick={this.handleFilter}>
                {filter}
              </button>
            </li>
          ))}
        </IssueFilter>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>

                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <IssuePagination page={page}>
          <button
            type="button"
            onClick={this.handlePreviousPage}
            className="previous-button"
          >
            Anterior
          </button>
          <button type="button" onClick={this.handleNextPage}>
            Próxima
          </button>
        </IssuePagination>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
