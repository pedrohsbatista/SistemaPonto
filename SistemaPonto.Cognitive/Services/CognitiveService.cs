using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.Azure.CognitiveServices.Vision.Face;
using SistemaPonto.Domain.Interface;
using SistemaPonto.Domain;
using System;

namespace SistemaPonto.Cognitive.Services {
    public class CognitiveService : ICognitiveService{
        private readonly IFaceClient _faceClient;

        private readonly AppSettings _appSettings;

        public CognitiveService(AppSettings appSettings){
            _appSettings = appSettings;
            _faceClient = new FaceClient(new ApiKeyServiceClientCredentials(appSettings.AzureCognitive.Key)) { Endpoint =  appSettings.AzureCognitive.Endpoint };
        }
 
        public async Task CreatePersonGroup()
        {          
           await _faceClient.PersonGroup.CreateAsync(_appSettings.AzureCognitive.PersonGroupId, _appSettings.AzureCognitive.PersonGroupId);
        }

        public async Task TrainGroup(){
           await _faceClient.PersonGroup.TrainAsync(_appSettings.AzureCognitive.PersonGroupId);
        }

        public async Task<Guid> CreatePerson(string nome)
        {
           var result = await _faceClient.PersonGroupPerson.CreateAsync(_appSettings.AzureCognitive.PersonGroupId, nome);
          
           await TrainGroup();
                    
           return result.PersonId;
        }

        public async Task UpdatePerson(Guid personId, string nome)
        {
           await _faceClient.PersonGroupPerson.UpdateAsync(_appSettings.AzureCognitive.PersonGroupId, personId, nome);
        }

        public async Task DeletePerson(Guid personId)
        {
           await _faceClient.PersonGroupPerson.DeleteAsync(_appSettings.AzureCognitive.PersonGroupId, personId);

           await TrainGroup();
        }       
    }
}