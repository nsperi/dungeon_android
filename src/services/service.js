class Service {
  constructor(repository) {
    this.repository = repository;
  }
  createService = async (data) => {
    try {
      const one = await this.repository.createRepoitory(data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  readService = async (role) => {
    try {
      const all = await this.repository.readRepoitory(role);
      return all;
    } catch (error) {
      throw error;
    }
  };
  paginateService = async ({ filter, opts }) => {
    try {
      const all = await this.repository.paginateRepoitory({ filter, opts });
      return all;
    } catch (error) {
      throw error;
    }
  };
  readOneService = async (uid) => {
    try {
      const one = await this.repository.readOneRepoitory(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
  updateService = async (uid, data) => {
    try {
      const one = await this.repository.updateRepository(uid, data);
      return one;
    } catch (error) {
      throw error;
    }
  };
  destroyService = async (uid) => {
    try {
      const one = await this.repository.destroyRepoitory(uid);
      return one;
    } catch (error) {
      throw error;
    }
  };
}

export default Service;
