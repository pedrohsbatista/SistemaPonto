using System.Threading.Tasks;
using Microsoft.Azure.CognitiveServices.Vision.Face;
using SistemaPonto.Domain.Interface;
using SistemaPonto.Domain;
using System;
using System.IO;

namespace SistemaPonto.Cognitive.Services {
    public class CognitiveService : ICognitiveService{
        private readonly IFaceClient _faceClient;

        private readonly AppSettings _appSettings;

        public CognitiveService(AppSettings appSettings){
            _appSettings = appSettings;
            _faceClient = new FaceClient(new ApiKeyServiceClientCredentials(appSettings.AzureCognitive.Key)) { Endpoint =  appSettings.AzureCognitive.Endpoint };
        } 

        public async Task<(Guid, Guid?)> CreatePerson(string nome, byte[] imagem) {
            var person = await _faceClient.PersonGroupPerson.CreateAsync(_appSettings.AzureCognitive.PersonGroupId, nome);
          
            Guid? persistedFaceId = null;
            if(imagem?.Length > 0) 
            {               
               persistedFaceId = await AddFace(_appSettings.AzureCognitive.PersonGroupId, person.PersonId, imagem);
            }

           await TrainGroup();
                    
           return (person.PersonId, persistedFaceId);
        }

        public async Task<Guid?> UpdatePerson(Guid personId, string nome, byte[] imagem, Guid? persistedFaceId) {
           await _faceClient.PersonGroupPerson.UpdateAsync(_appSettings.AzureCognitive.PersonGroupId, personId, nome);

           Guid? newPersistedFaceId = null;

           if(persistedFaceId.HasValue){
              await DeleteFace(_appSettings.AzureCognitive.PersonGroupId, personId, (Guid) persistedFaceId);
           }

           if(imagem?.Length > 0) 
           {
             newPersistedFaceId = await AddFace(_appSettings.AzureCognitive.PersonGroupId, personId, imagem);
           }

           await TrainGroup();

           return newPersistedFaceId;
        }

        public async Task DeletePerson(Guid personId) {          
           await _faceClient.PersonGroupPerson.DeleteAsync(_appSettings.AzureCognitive.PersonGroupId, personId);                 

           await TrainGroup();
        }  
            
         private async Task<Guid> AddFace(string personGroupId, Guid personId, byte[] imagem) {
            var stream = new MemoryStream(imagem);
            var result = await _faceClient.PersonGroupPerson.AddFaceFromStreamAsync(personGroupId, personId, stream);             
            return result.PersistedFaceId;
         }
      
        private async Task DeleteFace(string personGroupId, Guid personId, Guid persistedFaceId) {
            await _faceClient.PersonGroupPerson.DeleteFaceAsync(personGroupId, personId, persistedFaceId);
        }
       
        private async Task CreatePersonGroup() {          
           await _faceClient.PersonGroup.CreateAsync(_appSettings.AzureCognitive.PersonGroupId, _appSettings.AzureCognitive.PersonGroupId);
        }

        private async Task TrainGroup(){
           await _faceClient.PersonGroup.TrainAsync(_appSettings.AzureCognitive.PersonGroupId);
        }
    }
}