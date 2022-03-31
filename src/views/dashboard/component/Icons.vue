<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <div class="py-3" />

    <base-material-card
      color="success"
      icon="mdi-clipboard-plus"
      title="Usuarios"
      class="px-5 py-3"
    >
     <v-container class="d-flex flex-column align-end">
        <v-row>
            <v-col>
              <v-tooltip left>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn
                    v-on="{ ...tooltip }"
                    fab
                    small
                    v-show="true"
                    color="success"
                    @click.stop="create(true)"
                  >
                    <v-icon dark>mdi-plus</v-icon>
                  </v-btn>
                
                </template>
                <span>Nuevo</span>
              </v-tooltip>
            </v-col>
          </v-row>
     </v-container>
      <v-simple-table>
        
        <thead>
          <tr>
            <th class="primary--text">
              ID
            </th>
            <th class="primary--text">
              Usuario
            </th>
            <th class="primary--text">
             Fecha de Creación
            </th>
            <th class="primary--text">
              Rol
            </th>
            <th class="text-right primary--text">
              Solicitudes
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dakota Rice</td>
            <td>Niger</td>
            <td>Oud-Turnhout</td>
            <td class="text-right">
              $36,738
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Minverva Hooper</td>
            <td>Curaçao</td>
            <td>Sinaas-Waas</td>
            <td class="text-right">
              $23,789
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Sage Rodriguez</td>
            <td>Netherlands</td>
            <td>Baileux</td>
            <td class="text-right">
              $56,142
            </td>
          </tr>

          <tr>
            <td>4</td>
            <td>Philip Chaney</td>
            <td>Korea, South</td>
            <td>Overland Park</td>
            <td class="text-right">
              $38,735
            </td>
          </tr>

          <tr>
            <td>5</td>
            <td>Doris Greene</td>
            <td>Malawi</td>
            <td>Feldkirchen in Kärnten</td>
            <td class="text-right">
              $63,542
            </td>
          </tr>

          <tr>
            <td>6</td>
            <td>Mason Porter</td>
            <td>Chile</td>
            <td>Gloucester</td>
            <td class="text-right">
              $78,615
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </base-material-card>
  </v-container>
</template>


<script>
  export default {
    name: 'DashboardIcons',

    data: () => ({
      icons: [
        'mdi-access-point',
        'mdi-access-point-network',
        'mdi-account',
        'mdi-account-alert',
        'mdi-account-box',
        'mdi-account-box-multiple',
        'mdi-account-box-outline',
        'mdi-account-card-details',
        'mdi-account-check',
        'mdi-account-circle',
        'mdi-account-convert',
        'mdi-account-edit',
        'mdi-account-group',
        'mdi-account-heart',
        'mdi-account-key',
        'mdi-account-location',
        'mdi-account-minus',
        'mdi-account-multiple',
        'mdi-account-multiple-check',
        'mdi-account-multiple-minus',
        'mdi-account-multiple-outline',
        'mdi-account-multiple-plus',
        'mdi-account-multiple-plus-outline',
        'mdi-account-network',
        'mdi-account-off',
        'mdi-account-outline',
        'mdi-account-plus',
        'mdi-account-plus-outline',
        'mdi-account-remove',
        'mdi-account-search',
        'mdi-account-search-outline',
        'mdi-account-settings',
        'mdi-account-settings-variant',
        'mdi-account-star',
        'mdi-account-switch',
        'mdi-accusoft',
        'mdi-adjust',
        'mdi-adobe',
        'mdi-air-conditioner',
        'mdi-airballoon',
        'mdi-airplane',
        'mdi-airplane-landing',
        'mdi-airplane-off',
        'mdi-airplane-takeoff',
        'mdi-airplay',
        'mdi-airport',
        'mdi-alarm',
        'mdi-alarm-bell',
        'mdi-alarm-check',
        'mdi-alarm-light',
        'mdi-alarm-multiple',
        'mdi-alarm-off',
        'mdi-alarm-plus',
        'mdi-alarm-snooze',
        'mdi-album',
        'mdi-alert',
        'mdi-alert-box',
        'mdi-alert-circle',
        'mdi-alert-circle-outline',
        'mdi-alert-decagram',
        'mdi-alert-octagon',
        'mdi-alert-octagram',
        'mdi-alert-outline',
        'mdi-alien',
        'mdi-all-inclusive',
        'mdi-alpha',
        'mdi-alphabetical',
        'mdi-altimeter',
        'mdi-amazon',
        'mdi-amazon-alexa',
        'mdi-amazon-drive',
        'mdi-ambulance',
        'mdi-amplifier',
        'mdi-anchor',
        'mdi-android',
        'mdi-android-debug-bridge',
        'mdi-android-head',
        'mdi-android-studio',
        'mdi-angle-acute',
        'mdi-angle-obtuse',
        'mdi-angle-right',
        'mdi-angular',
        'mdi-angularjs',
        'mdi-animation',
        'mdi-animation-play',
        'mdi-anvil',
        'mdi-apple',
        'mdi-apple-finder',
        'mdi-apple-icloud',
        'mdi-apple-ios',
        'mdi-apple-keyboard-caps',
        'mdi-apple-keyboard-command',
        'mdi-apple-keyboard-control',
        'mdi-apple-keyboard-option',
        'mdi-apple-keyboard-shift',
        'mdi-apple-safari',
        'mdi-application',
        'mdi-approval',
        'mdi-apps',
        'mdi-arch',
        'mdi-archive',
        'mdi-arrange-bring-forward',
        'mdi-arrange-bring-to-front',
        'mdi-arrange-send-backward',
        'mdi-arrange-send-to-back',
        'mdi-arrow-all',
        'mdi-arrow-bottom-left',
        'mdi-arrow-bottom-left-bold-outline',
        'mdi-arrow-bottom-left-thick',
        'mdi-arrow-bottom-right',
        'mdi-arrow-bottom-right-bold-outline',
        'mdi-arrow-bottom-right-thick',
        'mdi-arrow-collapse',
        'mdi-arrow-collapse-all',
        'mdi-arrow-collapse-down',
        'mdi-arrow-collapse-horizontal',
        'mdi-arrow-collapse-left',
        'mdi-arrow-collapse-right',
        'mdi-arrow-collapse-up',
        'mdi-arrow-collapse-vertical',
        'mdi-arrow-decision',
        'mdi-arrow-decision-auto',
        'mdi-arrow-decision-auto-outline',
        'mdi-arrow-decision-outline',
        'mdi-arrow-down',
        'mdi-arrow-down-bold',
        'mdi-arrow-down-bold-box',
        'mdi-arrow-down-bold-box-outline',
        'mdi-arrow-down-bold-circle',
        'mdi-arrow-down-bold-circle-outline',
        'mdi-arrow-down-bold-hexagon-outline',
        'mdi-arrow-down-bold-outline',
        'mdi-arrow-down-box',
        'mdi-arrow-down-drop-circle',
        'mdi-arrow-down-drop-circle-outline',
        'mdi-arrow-down-thick',
        'mdi-arrow-expand',
        'mdi-arrow-expand-all',
        'mdi-arrow-expand-down',
        'mdi-arrow-expand-horizontal',
        'mdi-arrow-expand-left',
        'mdi-arrow-expand-right',
        'mdi-arrow-expand-up',
        'mdi-arrow-expand-vertical',
        'mdi-arrow-left',
        'mdi-arrow-left-bold',
        'mdi-arrow-left-bold-box',
        'mdi-arrow-left-bold-box-outline',
        'mdi-arrow-left-bold-circle',
        'mdi-arrow-left-bold-circle-outline',
        'mdi-arrow-left-bold-hexagon-outline',
        'mdi-arrow-left-bold-outline',
        'mdi-arrow-left-box',
        'mdi-arrow-left-drop-circle',
        'mdi-arrow-left-drop-circle-outline',
        'mdi-arrow-left-right-bold-outline',
        'mdi-arrow-left-thick',
        'mdi-arrow-right',
        'mdi-arrow-right-bold',
        'mdi-arrow-right-bold-box',
        'mdi-arrow-right-bold-box-outline',
        'mdi-arrow-right-bold-circle',
        'mdi-arrow-right-bold-circle-outline',
        'mdi-arrow-right-bold-hexagon-outline',
        'mdi-arrow-right-bold-outline',
        'mdi-arrow-right-box',
        'mdi-arrow-right-drop-circle',
        'mdi-arrow-right-drop-circle-outline',
        'mdi-arrow-right-thick',
        'mdi-arrow-split-horizontal',
        'mdi-arrow-split-vertical',
        'mdi-arrow-top-left',
        'mdi-arrow-top-left-bold-outline',
        'mdi-arrow-top-left-thick',
        'mdi-arrow-top-right',
        'mdi-arrow-top-right-bold-outline',
        'mdi-arrow-top-right-thick',
        'mdi-arrow-up',
        'mdi-arrow-up-bold',
        'mdi-arrow-up-bold-box',
        'mdi-arrow-up-bold-box-outline',
        'mdi-arrow-up-bold-circle',
        'mdi-arrow-up-bold-circle-outline',
        'mdi-arrow-up-bold-hexagon-outline',
        'mdi-arrow-up-bold-outline',
        'mdi-arrow-up-box',
        'mdi-arrow-up-down-bold-outline',
        'mdi-arrow-up-drop-circle',
        'mdi-arrow-up-drop-circle-outline',
        'mdi-arrow-up-thick',
        'mdi-artist',
        'mdi-assistant',
        'mdi-asterisk',
        'mdi-at',
        'mdi-atlassian',
        'mdi-atom',
        'mdi-attachment',
        'mdi-audio-video',
        'mdi-audiobook',
        'mdi-augmented-reality',
        'mdi-auto-fix',
        'mdi-auto-upload',
        'mdi-autorenew',
        'mdi-av-timer',
        'mdi-axe',
        'mdi-azure',
        'mdi-baby',
        'mdi-baby-buggy',
        'mdi-backburger',
        'mdi-backspace',
        'mdi-backup-restore',
        'mdi-badminton',
      ],
    }),
  }
</script>
