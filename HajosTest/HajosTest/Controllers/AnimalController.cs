using HajosTest.AnimalModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTest.Controllers
{
    [Route("api/animal")]
    [ApiController]
    public class AnimalController : ControllerBase
    {
        // api/animal/count
        [HttpGet]
        [Route("count")]
        public int M1()
        {
            AnimalDatabaseContext context = new AnimalDatabaseContext();
            int állatokSzáma = context.Animals.Count();
            return állatokSzáma;
        }

        // GET: api/animal>
        [HttpGet]
        public IEnumerable<Animal> Get()
        {
            AnimalDatabaseContext context = new AnimalDatabaseContext();
            return context.Animals.ToList();
        }

        // GET api/animal/5
        [HttpGet("{id}")]
        public Animal Get(int id)
        {
            AnimalDatabaseContext context = new AnimalDatabaseContext();
            var keresettÁllat = (from x in context.Animals
                                 where x.Id == id
                                 select x).FirstOrDefault();
            return keresettÁllat;
        }

        // POST api/<AnimalController>
        [HttpPost]
        public void Post([FromBody] Animal újÁllat)
        {
            AnimalDatabaseContext context = new AnimalDatabaseContext();
            context.Animals.Add(újÁllat);
            context.SaveChanges();
        }

        // PUT api/<AnimalController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AnimalController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            AnimalDatabaseContext context = new AnimalDatabaseContext();
            var törlendőÁllat = (from x in context.Animals
                                 where x.Id == id
                                 select x).FirstOrDefault();
            context.Animals.Remove(törlendőÁllat);
            context.SaveChanges();
        }
    }
}
