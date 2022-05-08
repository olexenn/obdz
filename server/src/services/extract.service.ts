import { getConnection } from "typeorm";
import { Extract } from "../entities/extract.model";
import { User } from "../entities/user.model";

class ExtractService {
  private extractRepository = getConnection().getRepository(Extract);

  /**
   * Create new extract
   * @param number Номер Впровадження
   * @param qualification Правова Кваліфікація
   * @param applicant_first_name Імʼя Потерпілого
   * @param applicant_last_name Прізвище Потерпілого
   * @param description Стислий виклад обставин
   * @param suspect ПІБ підозрюваного
   * @param authority Орган досудового розслідування
   * @param user Слідчий, що веде справу
   * @returns Created extract
   */
  async createExtract(
    number: string,
    qualification: string,
    applicant_first_name: string,
    applicant_last_name: string,
    description: string,
    authority: string,
    user: User
  ): Promise<Extract> {
    const extract = new Extract();
    extract.number = number;
    extract.qualification = qualification;
    extract.applicant_first_name = applicant_first_name;
    extract.applicant_last_name = applicant_last_name;
    extract.description = description;
    extract.authority = authority;
    extract.user = user;
    const createdExtract = await this.extractRepository.save(extract);
    return createdExtract;
  }

  /**
   * Get User's Current Extract
   * @param user слідчий, що веде справу
   * @returns extract object
   */
  async getSingle(user: User): Promise<Extract> {
    const extract = await this.extractRepository.findOne({
      where: { user: user },
    });
    return extract;
  }

  /**
   * Get all extracts
   * @returns extracts array
   */
  async getAll(): Promise<Extract[]> {
    return await this.extractRepository.find({ relations: ["user"] });
  }
}

export default ExtractService;
