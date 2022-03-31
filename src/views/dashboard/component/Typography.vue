<template>
  <v-container
    id="typography"
    fluid
    tag="section"
  >
  
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12">
       
          <template v-slot:heading>
            <div class="text-h3 font-weight-light">
             Detalle de Solicitud
            </div>

            <div class="text-subtitle-1 font-weight-light">
              Created using Roboto Font Family
            </div>
          </template>

          <v-card-text>
            <v-container
                class="ma-2"
              fluid
            >
              <v-row
              
                align="center"
              >
                <v-col
                  cols="1"
                  md="3"
                >
                    <span style="font-size:18px;">  <v-chip class="">Título: Cambio de Login</v-chip></span>
                   
                </v-col>
                 <v-col
                  cols="1"
                  md="3"
                >
                  
                
                </v-col>
        
               
              </v-row>
               <v-row
              
                align="center"
              >
                <v-col
                  cols="1"
                  md="3"
                >
                    <span style="font-size:18px;">  <v-chip class="">Título: Cambio de Login</v-chip></span>
                   
                </v-col>
                 <v-col
                  cols="1"
                  md="3"
                >
                  
                
                </v-col>
        
               
              </v-row>
            </v-container>
          </v-card-text>
    
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  const leader = 'I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at.'
  const leaderShort = leader.slice(0, 105) + '...'
  const material = 'The Life of Material Dashboard'
  const small = 'Header with small subtitle'

  export default {
    data: () => ({
      typography: {
        'display-4': ['Display 4', material, 'h1'],
        'display-3': ['Display 3', material, 'h2'],
        'display-2': ['Display 2', material, 'h3'],
        'display-1': ['Display 1', material, 'h4'],
        headline: ['Headline', material, 'h5'],
        'title text-uppercase': ['Title', material, 'h6'],
        '': ['Paragraph', leader, 'p'],
        blockquote: ['Quote', leader, 'blockquote'],
        'text--disabled': ['Muted Text', leaderShort, 'p'],
        'primary--text': ['Primary Text', leaderShort, 'p'],
        'info--text': ['Info Text', leaderShort, 'p'],
        'success--text': ['Success Text', leaderShort, 'p'],
        'warning--text': ['Warning Text', leaderShort, 'p'],
        'danger--text': ['Danger Text', leaderShort, 'p'],
        small: ['Small Tag', small, 'h2'],
      },
    }),
  }
</script>

<style lang="scss">
  .tim-note {
    bottom: 10px;
    color: #c0c1c2;
    display: block;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    left: 0;
    margin-left: 20px;
    width: 260px;
  }
</style>
